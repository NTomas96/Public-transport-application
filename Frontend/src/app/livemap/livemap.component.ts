import {Component, OnInit} from "@angular/core";
import {MapTypeStyle} from "@agm/core";
import {MatSelectChange} from "@angular/material";
import {LinesService} from "../api/services/lines.service";
import {Station} from "../api/models/station";
import {Line} from "../api/models/line";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {StationsService} from "../api/services/stations.service";
import * as signalR from "@aspnet/signalr";
import {environment} from "../../environments/environment";


@Component({
	selector: "app-livemap",
	templateUrl: "./livemap.component.html",
	styleUrls: ["./livemap.component.css"]
})
export class LivemapComponent implements OnInit {

	constructor(private linesService: LinesService, private stationsService: StationsService) {
	}

	lat = 44.2743;
	lng = 19.8903;
	zoom = 14;

	mapStyle = [({
		featureType: "transit.station.bus",
		stylers: [{visibility: "off"}]
	} as MapTypeStyle)];

	stations: Array<Station> = [];
	vehicles = [];
	lines: Array<Line> = [];

	selectedLine: Line = null;

	private hubConnection: signalR.HubConnection;

	getVehicleById(id) {
		for (const vehicle of this.vehicles) {
			if (vehicle.id === id) {
				return vehicle;
			}
		}

		return null;
	}

	ngOnInit(): void {

		this.selectedLine = null;

		this.linesService.getLinesWithStations().subscribe(
			(data: Array<Line>) => {
				this.lines = data;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);

		this.stationsService.getStations().subscribe(
			(data: Array<Station>) => {
				this.stations = data;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);

		this.hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(environment.wsUrl)
			.build();

		this.hubConnection
			.start()
			.then(() => console.log("Connection started"))
			.catch(err => console.log("Error while starting connection: " + err));

		this.hubConnection.on("UpdateVehicle", (id, lineId, lat, lon) => {

			const vehicle = this.getVehicleById(id);

			if (vehicle === null) {
				this.vehicles.push({id, lineId, lat, lon});
			} else {
				vehicle.lat = lat;
				vehicle.lon = lon;
			}
		});
	}

	lineChanged($event: MatSelectChange) {

		this.linesService.getLine({id: $event.value}).subscribe(
			(data: Line) => {
				this.selectedLine = data;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}
}
