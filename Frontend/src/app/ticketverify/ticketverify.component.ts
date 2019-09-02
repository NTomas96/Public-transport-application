import { Component, OnInit } from "@angular/core";
import {ApiService} from "../api/api.service";

@Component({
	selector: "app-ticketverify",
	templateUrl: "./ticketverify.component.html",
	styleUrls: ["./ticketverify.component.css"]
})
export class TicketverifyComponent implements OnInit {
	ticketNumber = "";

	constructor(private apiService: ApiService) { }

	ngOnInit() {
	}

	checkTicket() {
		this.apiService.checkTicket(this.ticketNumber, {
			success: (valid) => {
				alert(valid ? "Karta je validna." : "Karta nije validna");
			},
			error: (code, message) => {
				alert(message);
			}
		});
	}

	ticketNumberChanged($event) {
		this.ticketNumber = $event.target.value;
	}
}
