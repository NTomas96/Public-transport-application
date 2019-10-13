import {Component} from "@angular/core";
import {UserType} from "../api/models/user-type";
import {UserLogin} from "../shared/user-login";

@Component({
	selector: "app-root",
	templateUrl: "./page.component.html",
	styleUrls: ["./page.component.css"],
})
export class PageComponent {

	constructor(private userLogin: UserLogin) { }

	links = [
		{href: "", name: "Pocetna", icon: "home", side: "left"},
		{href: "lines", name: "Mreza linija", icon: "map", side: "left"},
		{href: "timetable", name: "Red voznje", icon: "today", side: "left"},
		{href: "livemap", name: "Trenutna lokacija", icon: "directions_bus", side: "left"},
		{href: "prices", name: "Cenovnik", icon: "money", side: "left"},
		{href: "login", name: "Prijava", icon: "account_circle", side: "right", auth: false},
		{href: "profile", name: "Profil", icon: "account_circle", side: "right", auth: true, role: UserType.Passenger},
		{href: "userverify", name: "Verifikacija korisnika", icon: "account_circle", side: "right", auth: true, role: UserType.Controller},
		{href: "ticketverify", name: "Verifikacija karata", icon: "account_circle", side: "right", auth: true, role: UserType.Controller},
		{href: "logout", name: "Odjava", icon: "account_circle", side: "right", auth: true}

	];

	shouldShowLink(link) {
		return (link.auth === undefined ||
			((link.auth === true && this.getAuth()) && (link.role === undefined || (link.role === this.getUserType()) )) ||
			(link.auth === false && ! this.getAuth()));
	}

	getAuth() {
		return this.userLogin.isLoggedIn();
	}

	getUserType(): UserType {
		return this.userLogin.userType;
	}
}
