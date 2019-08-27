import {Component, OnInit} from "@angular/core";
import {MapTypeStyle} from "@agm/core";
import {ApiService} from "../api/api.service";
import {MatSelectChange} from "@angular/material";


@Component({
	selector: "app-livemap",
	templateUrl: "./livemap.component.html",
	styleUrls: ["./livemap.component.css"]
})
export class LivemapComponent implements OnInit {

	constructor(private apiService: ApiService) {
	}

	title = "Trenutna lokacija";
	lat = 44.2743;
	lng = 19.8903;
	zoom = 14;

	mapStyle = [({
		featureType: "transit.station.bus",
		stylers: [{visibility: "off"}]
	} as MapTypeStyle)];

	stations = [];
	lines = [];

	selectedLine = null;

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

	lineChanged($event: MatSelectChange) {
		this.apiService.getLine($event.value, {
			success: (data) => {
				this.selectedLine = data;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}
}
