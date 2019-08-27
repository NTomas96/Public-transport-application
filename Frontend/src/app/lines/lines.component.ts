import {Component, OnInit} from "@angular/core";
import {MapTypeStyle} from "@agm/core";
import {ApiService} from "../api/api.service";


@Component({
	selector: "app-lines",
	templateUrl: "./lines.component.html",
	styleUrls: ["./lines.component.css"]
})
export class LinesComponent implements OnInit {

	constructor(private apiService: ApiService) {
	}

	title = "Mreza linija";
	lat = 44.2743;
	lng = 19.8903;
	zoom = 14;

	mapStyle = [({
		featureType: "transit.station.bus",
		stylers: [{visibility: "off"}]
	} as MapTypeStyle)];

	stations = [];
	lines = [];

	ngOnInit(): void {
		this.apiService.getLinesWithStations({
			success: (data) => {
				this.lines = data;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});

		this.apiService.getStations({
			success: (data) => {
				this.stations = data;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	onMouseOver(infoWindow: any) {
		infoWindow.open();
	}

	onMouseOut(infoWindow: any) {
		infoWindow.close();
	}
}
