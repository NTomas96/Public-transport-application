import {Component} from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./page.component.html",
	styleUrls: ["./page.component.css"]
})
export class PageComponent {
	title = "...";
	links = [
		{href: "", name: "Pocetna", icon: "home", side: "left"},
		{href: "lines", name: "Mreza linija", icon: "map", side: "left"},
		{href: "timetable", name: "Red voznje", icon: "today", side: "left"},
		{href: "livemap", name: "Trenutna lokacija", icon: "directions_bus", side: "left"},
		{href: "prices", name: "Cenovnik", icon: "money", side: "left"},
		{href: "login", name: "Prijava", icon: "account_circle", side: "right"}
	];
}
