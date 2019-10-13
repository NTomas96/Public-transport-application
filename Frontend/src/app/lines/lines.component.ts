import {Component, OnInit} from "@angular/core";
import {MapTypeStyle} from "@agm/core";
import {LinesService} from "../api/services/lines.service";
import {Line} from "../api/models/line";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {StationsService} from "../api/services/stations.service";
import {Station} from "../api/models/station";


@Component({
	selector: "app-lines",
	templateUrl: "./lines.component.html",
	styleUrls: ["./lines.component.css"]
})
export class LinesComponent implements OnInit {

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
	lines: Array<Line> = [];

	ngOnInit(): void {
		this.linesService.getLinesWithStations().subscribe(
			(data: Line[]) => {
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

	}

	onMouseOver(infoWindow: any) {
		infoWindow.open();
	}

	onMouseOut(infoWindow: any) {
		infoWindow.close();
	}
}
