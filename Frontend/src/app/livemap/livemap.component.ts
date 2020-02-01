import {Component, OnInit} from "@angular/core";
import {MapTypeStyle} from "@agm/core";
import {MatSelectChange} from "@angular/material";
import {LinesService} from "../api/services/lines.service";
import {Station} from "../api/models/station";
import {Line} from "../api/models/line";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {StationsService} from "../api/services/stations.service";
import * as signalR from "@aspnet/signalr";


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
	message = "";

	getVehicleById(id) {
		for (const vehicle of this.vehicles) {
			if (vehicle.Id === id) {
				return vehicle;
			}
		}

		return null;
	}

	ngOnInit(): void {

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

		/*const connection = signalR.hubConnection;
		const contosoChatHubProxy = connection.createHubProxy("Bus");
		contosoChatHubProxy.on("hello", (v) => {

			const vehicle = this.getVehicleById(v.Id);

			if (vehicle === null) {
				this.vehicles.push(v);
			} else {
				vehicle.Lat = v.Lat;
				vehicle.Lon = v.Lon;
			}

			// console.log(vehicle);
		});
		connection.start().done(() => {

		});*/

		this.hubConnection = new signalR.HubConnectionBuilder()
			.withUrl("http://localhost:57563/" + "bus")
			.build();

		this.hubConnection
			.start()
			.then(() => console.log("Connection started"))
			.catch(err => console.log("Error while starting connection: " + err));

		this.hubConnection.on("SayHello", (data) => {
			this.message = data;
			console.log(data);
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
