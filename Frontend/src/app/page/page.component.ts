import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"]
})
export class PageComponent {
  title = "...";
  links = [
	  { href: "", name: "Pocetna", icon: "home" },
	  { href: "lines", name: "Mreza linija", icon: "map" },
	  { href: "timetable", name: "Red voznje", icon: "today" },
	  { href: "livemap", name: "Trenutna lokacija", icon: "directions_bus" },
	  { href: "prices", name: "Cenovnik", icon: "money" },
	  { href: "login", name: "Registruj se!", icon: "account_circle"}
  ];
}
