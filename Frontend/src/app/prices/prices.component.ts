import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogConfig, MatSelectChange} from "@angular/material";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal/lib/models/paypal-models";
import {TicketdialogComponent} from "./ticketdialog/ticketdialog.component";
import {PricelistsService} from "../api/services/pricelists.service";
import {BuyTicketsService} from "../api/services/buy-tickets.service";
import {Pricelist} from "../api/models/pricelist";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {Ticket} from "../api/models/ticket";
import {PassengerType, TicketType, User} from "../api/models";
import {UserLogin} from "../shared/user-login";
import {UsersService} from "../api/services/users.service";

@Component({
	selector: "app-prices",
	templateUrl: "./prices.component.html",
	styleUrls: ["./prices.component.css"]
})
export class PricesComponent implements OnInit {

	// tslint:disable-next-line:max-line-length
	constructor(private userLogin: UserLogin, private usersService: UsersService, private pricelistsService: PricelistsService, private buyTicketsService: BuyTicketsService, private dialog: MatDialog) {

	}

	passengerTypes = [
		{id: PassengerType.Regular, name: "Regularni"},
		{id: PassengerType.Student, name: "Student"},
		{id: PassengerType.Pensioner, name: "Penzioner"}
	];
	ticketTypes = [
		{id: TicketType.TimeTicket, name: "Vremenska"},
		{id: TicketType.DailyTicket, name: "Dnevna"},
		{id: TicketType.MonthlyTicket, name: "Mesecna"},
		{id: TicketType.YearlyTicket, name: "Godisnja"},
	];

	buyTicketTypes = [];
	buyTicketType: TicketType = null;
	buyTicketTypePrice: Pricelist = null;

	selectedTicketType: TicketType = null;
	selectedPassengerType: PassengerType = null;
	selectedTicket: Pricelist = null;

	public payPalConfig?: IPayPalConfig;

	ngOnInit() {
		this.updateBuyTickets();
	}

	private initConfig(card: Pricelist): void {
		this.payPalConfig = {
			currency: "EUR",
			clientId: "ATsKexGYCoUhokUVT1tHhSjXHKAuvNcRLNNFXWYbyzsS7uPFOThLrcoesZjsDWjhp2Ly3xBWFzp00T3t",
			createOrderOnClient: () => ({
				intent: "CAPTURE",
				purchase_units: [
					{
						amount: {
							currency_code: "EUR",
							value: "" + card.price,
							breakdown: {
								item_total: {
									currency_code: "EUR",
									value: "" + card.price
								}
							}
						},
						items: [
							{
								name: this.getTicketTypeName(card.ticketType) + " karta",
								quantity: "1",
								category: "DIGITAL_GOODS",
								unit_amount: {
									currency_code: "EUR",
									value: "" + card.price,
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
			onApprove: () => {
			},
			onClientAuthorization: (data) => {
				this.buyTicketsService.buyTicket({ticketType: this.buyTicketTypePrice.ticketType, orderId: data.id}).subscribe(
					(ticket: Ticket) => {
						const dialogConfig = new MatDialogConfig();

						dialogConfig.disableClose = false;
						dialogConfig.autoFocus = true;
						dialogConfig.data = ticket.ticketNumber;

						this.dialog.open(TicketdialogComponent, dialogConfig);
					},
					(error: ErrorApiResponse) => {
						alert("Error " + error.errorMessage);
					}
				);
			},
			onCancel: () => {
			},
			onError: err => {
				console.log("OnError", err);
			},
			onClick: () => {
			},
		};
	}

	getPassengerTypeName(id: PassengerType) {
		return this.passengerTypes.filter(o => o.id === id)[0].name;
	}

	getTicketTypeName(id: TicketType) {
		return this.ticketTypes.filter(o => o.id === id)[0].name;
	}

	ticketTypeChanged($event: MatSelectChange) {
		this.selectedTicketType = $event.value;

		if (this.selectedPassengerType != null) {
			this.updateTicket(this.selectedTicketType, this.selectedPassengerType);
		}
	}

	passengerTypeChanged($event: MatSelectChange) {
		this.selectedPassengerType = $event.value;

		if (this.selectedTicketType != null) {
			this.updateTicket(this.selectedTicketType, this.selectedPassengerType);
		}
	}

	buyTicketTypeChanged($event: MatSelectChange) {
		this.buyTicketType = $event.value;

		this.pricelistsService.getPricelistMe({ticketType: this.buyTicketType}).subscribe(
			(price: Pricelist) => {
				this.buyTicketTypePrice = price;
				this.initConfig(price);
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	updateTicket(selectedTicketType: TicketType, selectedPassengerType: PassengerType) {
		this.pricelistsService.getPricelist({ticketType: selectedTicketType, passengerType: selectedPassengerType}).subscribe(
			(price: Pricelist) => {
				this.selectedTicket = price;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	updateBuyTickets() {
		if (!this.userLogin.isLoggedIn()) {
			this.buyTicketTypes = [{id: 0, name: "Vremenska"}];
			return;
		}

		this.usersService.getMe().subscribe(
			(user: User) => {
				if (user.active) {
					this.buyTicketTypes = this.ticketTypes;
				} else {
					this.buyTicketTypes = [];
				}
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	getBuyTicketTypes() {
		return this.buyTicketTypes;
	}
}
