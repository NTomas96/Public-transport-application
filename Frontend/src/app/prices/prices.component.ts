import {Component, OnInit} from "@angular/core";
import {MatSelectChange} from "@angular/material";
import {ApiService} from "../api/api.service";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal/lib/models/paypal-models";

@Component({
	selector: "app-prices",
	templateUrl: "./prices.component.html",
	styleUrls: ["./prices.component.css"]
})
export class PricesComponent implements OnInit {

	constructor(private apiService: ApiService) {

	}
	title = "Cenovnik";

	passengerTypes = [
		{id: 0, name: "Regularni"},
		{id: 1, name: "Student"},
		{id: 2, name: "Penzioner"}
	];
	ticketTypes = [
		{id: 0, name: "Vremenska"},
		{id: 1, name: "Dnevna"},
		{id: 2, name: "Mesecna"},
		{id: 3, name: "Godisnja"},
	];

	buyTicketTypes = [];
	buyTicketType = null;
	buyTicketTypePrice = null;

	selectedTicketType = null;
	selectedPassengerType = null;
	selectedTicket = null;

	public payPalConfig?: IPayPalConfig;

	ngOnInit() {
		this.updateBuyTickets();
	}

	private initConfig(cardType): void {
		this.payPalConfig = {
			currency: "EUR",
			clientId: "ATsKexGYCoUhokUVT1tHhSjXHKAuvNcRLNNFXWYbyzsS7uPFOThLrcoesZjsDWjhp2Ly3xBWFzp00T3t",
			createOrderOnClient: (data) => ({
				intent: "CAPTURE",
				purchase_units: [
					{
						amount: {
							currency_code: "EUR",
							value: "" + cardType.Price,
							breakdown: {
								item_total: {
									currency_code: "EUR",
									value: "" + cardType.Price
								}
							}
						},
						items: [
							{
								name: this.ticketTypes[cardType.TicketType] + " karta",
								quantity: "1",
								category: "DIGITAL_GOODS",
								unit_amount: {
									currency_code: "EUR",
									value: "" + cardType.Price,
								},
							}
						]
					}
				]
			} as ICreateOrderRequest),
			advanced: {
				commit: "true"
			},
			style: {
				label: "paypal",
				layout: "vertical"
			},
			onApprove: (data, actions) => {
				console.log("onApprove - transaction was approved, but not authorized", data, actions);
				actions.order.get().then(details => {
					console.log("onApprove - you can get full order details inside onApprove: ", details);
				});
			},
			onClientAuthorization: (data) => {
				this.apiService.buyTicket(this.buyTicketTypePrice.TicketType, data.id, {
					success: (res) => {

					},
					error: (code, message) => {
						alert("Error " + message);
					}
				});
				console.log("onClientAuthorization - you should probably inform your server about completed transaction at this point", data);
			},
			onCancel: (data, actions) => {
				console.log("OnCancel", data, actions);
			},
			onError: err => {
				console.log("OnError", err);
			},
			onClick: (data, actions) => {
				console.log("onClick", data, actions);
			},
		};
	}

	getPassengerTypeName(id: number) {
		return this.passengerTypes.filter(o => o.id === id)[0].name;
	}

	getTicketTypeName(id: number) {
		return this.ticketTypes.filter(o => o.id === id)[0].name;
	}

	ticketTypeChanged($event: MatSelectChange) {
		this.selectedTicketType = $event.value;

		if (this.selectedPassengerType != null) {
			this.updateTicket(this.selectedTicketType, this.selectedPassengerType);
		}
	}

	buyTicketTypeChanged($event: MatSelectChange) {
		this.buyTicketType = $event.value;

		this.apiService.getTicketPriceMe(this.buyTicketType, {
			success: (price) => {
				this.buyTicketTypePrice = price;
				this.initConfig(price);
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	passengerTypeChanged($event: MatSelectChange) {
		this.selectedPassengerType = $event.value;

		if (this.selectedTicketType != null) {
			this.updateTicket(this.selectedTicketType, this.selectedPassengerType);
		}
	}

	updateTicket(selectedTicketType: number, selectedPassengerType: number) {
		this.apiService.getTicketPrice(selectedTicketType, selectedPassengerType, {
			success: (price) => {
				this.selectedTicket = price;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	updateBuyTickets() {
		if (!this.apiService.loggedIn()) {
			this.buyTicketTypes = [{id: 0, name: "Vremenska"}];
			return;
		}

		this.apiService.getUser({
			success: (user) => {
				if (user.Active) {
					this.buyTicketTypes = this.ticketTypes;
				} else {
					this.buyTicketTypes = [];
				}
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	getBuyTicketTypes() {
		return this.buyTicketTypes;
	}
}
