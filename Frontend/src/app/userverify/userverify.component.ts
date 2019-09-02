import { Component, OnInit } from "@angular/core";
import {ApiService} from "../api/api.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {InfodialogComponent} from "./infodialog/infodialog.component";

@Component({
	selector: "app-userverify",
	templateUrl: "./userverify.component.html",
	styleUrls: ["./userverify.component.css"]
})
export class UserverifyComponent implements OnInit {

	constructor(private apiService: ApiService, private dialog: MatDialog) { }

	passengerTypes = ["Regularani", "Student", "Penzioner"];

	unverifiedUsers = [];

	displayColumns = [
		{key: "Id", name: "#", auto: true},
		{key: "FirstName", name: "Ime", auto: true},
		{key: "LastName", name: "Prezime", auto: true},
		{key: "PassengerType", name: "Tip putnika", auto: false},
		{key: "Actions", name: "Akcije", auto: false},
	];

	displayColumnsParsed = Array.from(this.displayColumns, (x) => x.key);

	ngOnInit() {
		this.refreshData();
	}

	refreshData() {
		this.apiService.getUnverifiedUsers({
			success: (users) => {
				this.unverifiedUsers = users;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	showInfo(element: any) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			image: element.AdditionalInfo
		};

		this.dialog.open(InfodialogComponent, dialogConfig);
	}

	acceptUser(element: any) {
		this.apiService.acceptUser(element.Id, {
			success: (ignore) => {
				this.refreshData();
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	denyUser(element: any) {
		this.apiService.denyUser(element.Id, {
			success: (ignore) => {
				this.refreshData();
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}
}
