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
		this.apiService
			.getLinesWithStations()
			.subscribe(
				(lines) => {
					this.lines = lines;
				}
			);

		this.apiService
			.getStations()
			.subscribe(
				(stations) => {
					this.stations = stations;
				}
			);
	}
}
