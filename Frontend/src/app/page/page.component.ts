import {ChangeDetectionStrategy, Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";

@Component({
	selector: "app-root",
	templateUrl: "./page.component.html",
	styleUrls: ["./page.component.css"],
})
export class PageComponent {

	constructor(private apiService: ApiService) { }

	title = "...";
	links = [
		{href: "", name: "Pocetna", icon: "home", side: "left"},
		{href: "lines", name: "Mreza linija", icon: "map", side: "left"},
		{href: "timetable", name: "Red voznje", icon: "today", side: "left"},
		{href: "livemap", name: "Trenutna lokacija", icon: "directions_bus", side: "left"},
		{href: "prices", name: "Cenovnik", icon: "money", side: "left"},
		{href: "login", name: "Prijava", icon: "account_circle", side: "right", auth: false},
		{href: "profile", name: "Profil", icon: "account_circle", side: "right", auth: true},
		{href: "logout", name: "Odjava", icon: "account_circle", side: "right", auth: true}

	];

	shouldShowLink(link) {
		return (link.auth === undefined || (link.auth === true && this.getAuth()) || (link.auth === false && ! this.getAuth()));
	}

	getAuth() {
		return this.apiService.loggedIn();
	}
}
