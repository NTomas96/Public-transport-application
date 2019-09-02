import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
	selector: "app-ticketdialog",
	templateUrl: "./ticketdialog.component.html",
	styleUrls: ["./ticketdialog.component.css"]
})
export class TicketdialogComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<TicketdialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
		console.log("test2");
	}

	ngOnInit() {}

	onOkClick() {
		this.dialogRef.close();
	}
}
