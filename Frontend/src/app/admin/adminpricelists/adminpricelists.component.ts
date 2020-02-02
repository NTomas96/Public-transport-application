import {Component, OnInit} from "@angular/core";
import {TicketType} from "../../api/models/ticket-type";
import {PassengerType} from "../../api/models/passenger-type";
import {Pricelist} from "../../api/models/pricelist";
import {AdminService} from "../../api/services/admin.service";
import {ErrorApiResponse} from "../../api/models/error-api-response";

@Component({
	selector: "app-adminpricelists",
	templateUrl: "./adminpricelists.component.html",
	styleUrls: ["./adminpricelists.component.css"]
})
export class AdminpricelistsComponent implements OnInit {

	private ticketTypes: any[] = [
		{id: TicketType.TimeTicket, name: "Vremenska karta"},
		{id: TicketType.DailyTicket, name: "Dnevna karta"},
		{id: TicketType.MonthlyTicket, name: "Mesecna karta"},
		{id: TicketType.YearlyTicket, name: "Godisnja karta"}
	];

	private passengerTypes: any[] = [
		{id: PassengerType.Regular, name: "Regularni"},
		{id: PassengerType.Pensioner, name: "Penzioner"},
		{id: PassengerType.Student, name: "Student"}
	];

	private selectedPrice: Pricelist;

	constructor(private adminService: AdminService) {
	}

	ngOnInit() {
		this.selectedPrice = null;
	}

	selectPrice(ticketType: TicketType, passengerType: PassengerType) {
		this.adminService.getTicketPrice({ticketType, passengerType}).subscribe(
			(value: Pricelist) => {
				this.selectedPrice = value;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);
	}

	savePrice() {
		const price = this.selectedPrice;
		this.adminService.setTicketPrice$Json({ticketType: price.ticketType, passengerType: price.passengerType, body: price}).subscribe(
			(success: boolean) => {
				//
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);
	}
}
