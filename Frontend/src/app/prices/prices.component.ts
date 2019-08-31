import {Component} from "@angular/core";
import {MatSelectChange} from "@angular/material";
import {ApiService} from "../api/api.service";

@Component({
	selector: "app-prices",
	templateUrl: "./prices.component.html",
	styleUrls: ["./prices.component.css"]
})
export class PricesComponent {

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
	selectedTicketType = null;
	selectedPassengerType = null;
	selectedTicket = null;

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
}
