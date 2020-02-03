import {Component, OnInit} from "@angular/core";
import {Line} from "../../api/models/line";
import {Station} from "../../api/models/station";
import {AdminService} from "../../api/services/admin.service";
import {ErrorApiResponse} from "../../api/models/error-api-response";
import {Router} from "@angular/router";

@Component({
	selector: "app-adminlinestation",
	templateUrl: "./adminlinestation.component.html",
	styleUrls: ["./adminlinestation.component.css"]
})
export class AdminlinestationComponent implements OnInit {
	private lines: Line[];
	private stations: Station[];

	constructor(private adminService: AdminService, private router: Router) {
	}

	ngOnInit() {
		this.adminService.getLines().subscribe(
			(value: Line[]) => {
				this.lines = value;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);

		this.adminService.getStations().subscribe(
			(value: Station[]) => {
				this.stations = value;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);
	}

	selectLine(value: number) {
		this.router.navigate(["admin/linestation/:obj/:id", {obj: "line", id: value}]);
	}

	selectStation(value: number) {
		this.router.navigate(["admin/linestation/:obj/:id", {obj: "station", id: value}]);
	}
}
