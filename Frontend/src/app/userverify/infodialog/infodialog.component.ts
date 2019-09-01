import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
	selector: "app-infodialog",
	templateUrl: "./infodialog.component.html",
	styleUrls: ["./infodialog.component.css"]
})
export class InfodialogComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) data) {
		this.image = data.image;
	}

	image = "";

	ngOnInit() {
	}

}
