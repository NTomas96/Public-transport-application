import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../api/services/admin.service";
import {ErrorApiResponse} from "../../api/models/error-api-response";
import {Station} from "../../api/models/station";
import {Router} from "@angular/router";

@Component({
	selector: "app-adminstations",
	templateUrl: "./adminstations.component.html",
	styleUrls: ["./adminstations.component.css"]
})
export class AdminstationsComponent implements OnInit {


	constructor(private adminService: AdminService, private router: Router) {
	}

	stations: Station[] = [];

	displayColumns = [
		{key: "id", name: "#", auto: true},
		{key: "name", name: "Ime", auto: true},
		{key: "actions", name: "Akcije", auto: false},
	];

	displayColumnsParsed = Array.from(this.displayColumns, (x) => x.key);

	ngOnInit() {
		this.refreshData();
	}

	refreshData() {
		this.adminService.getStations().subscribe(
			(stations: Station[]) => {
				this.stations = stations;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	add() {
		this.router.navigate(["/admin/stations/edit"]);
	}

	edit(station: Station) {
		this.router.navigate(["/admin/stations/edit", {id: station.id}]);
	}

	delete(station: Station) {
		this.adminService.deleteStation({id: station.id}).subscribe(
			() => {
				this.refreshData();
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}
}
