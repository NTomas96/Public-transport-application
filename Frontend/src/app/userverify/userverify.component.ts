import { Component, OnInit } from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {InfodialogComponent} from "./infodialog/infodialog.component";
import {UsersService} from "../api/services/users.service";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {User} from "../api/models/user";

@Component({
	selector: "app-userverify",
	templateUrl: "./userverify.component.html",
	styleUrls: ["./userverify.component.css"]
})
export class UserverifyComponent implements OnInit {

	constructor(private usersService: UsersService, private dialog: MatDialog) { }

	passengerTypes = ["Regularani", "Student", "Penzioner"];

	unverifiedUsers: User[] = [];

	displayColumns = [
		{key: "id", name: "#", auto: true},
		{key: "firstName", name: "Ime", auto: true},
		{key: "lastName", name: "Prezime", auto: true},
		{key: "passengerType", name: "Tip putnika", auto: false},
		{key: "actions", name: "Akcije", auto: false},
	];

	displayColumnsParsed = Array.from(this.displayColumns, (x) => x.key);

	ngOnInit() {
		this.refreshData();
	}

	refreshData() {
		this.usersService.getUnverified().subscribe(
			(users: User[]) => {
				this.unverifiedUsers = users;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	showInfo(element: User) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			image: element.additionalInfo
		};

		this.dialog.open(InfodialogComponent, dialogConfig);
	}

	acceptUser(element: User) {
		this.usersService.accept({userId: element.id}).subscribe(
			() => {
				this.refreshData();
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	denyUser(element: User) {
		this.usersService.deny({userId: element.id}).subscribe(
			() => {
				this.refreshData();
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}
}
