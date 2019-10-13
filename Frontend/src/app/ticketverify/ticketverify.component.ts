import { Component, OnInit } from "@angular/core";
import {UsersService} from "../api/services/users.service";
import {Line} from "../api/models/line";
import {ErrorApiResponse} from "../api/models/error-api-response";

@Component({
	selector: "app-ticketverify",
	templateUrl: "./ticketverify.component.html",
	styleUrls: ["./ticketverify.component.css"]
})
export class TicketverifyComponent implements OnInit {
	ticketNumber = "";

	constructor(private usersService: UsersService) { }

	ngOnInit() {
	}

	checkTicket() {
		this.usersService.checkTicket({ticketNumber: this.ticketNumber}).subscribe(
			(valid: boolean) => {
				alert(valid ? "Karta je validna." : "Karta nije validna");
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	ticketNumberChanged($event) {
		this.ticketNumber = $event.target.value;
	}
}
