import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../api/services/admin.service";
import {Line} from "../../../api/models/line";
import {Station} from "../../../api/models/station";
import {StationLine} from "../../../api/models/station-line";
import {ErrorApiResponse} from "../../../api/models/error-api-response";

@Component({
	selector: "app-editlinestation",
	templateUrl: "./editlinestation.component.html",
	styleUrls: ["./editlinestation.component.css"]
})
export class EditlinestationComponent implements OnInit {

	private selectedElement: Line|Station;
	private elements: StationLine[];
	private isLine: boolean;
	private lines: Line[];
	private stations: Station[];

	@ViewChild("elementTable") elementTable;

	constructor(private route: ActivatedRoute, private adminService: AdminService) {
	}

	ngOnInit() {
		const paramId = this.route.snapshot.paramMap.get("id");
		const paramObj = this.route.snapshot.paramMap.get("obj");

		const id = parseInt(paramId, 10);
		this.elements = [];
		this.selectedElement = null;
		this.lines = [];
		this.stations = [];

		this.adminService.getLines().subscribe(
			(lines: Line[]) => {
				this.lines = lines;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);

		this.adminService.getStations().subscribe(
			(stations: Station[]) => {
				this.stations = stations;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);

		switch (paramObj) {
			case "line":
				this.adminService.getLine({id}).subscribe(
					(line: Line) => {
						this.selectedElement = line;
						this.elements = line.stations;
						this.isLine = true;
					},
					(error: ErrorApiResponse) => {
						alert(error.errorMessage);
					}
				);
				break;
			case "station":
				this.adminService.getStation({id}).subscribe(
					(station: Station) => {
						this.selectedElement = station;
						this.elements = station.lines;
						this.isLine = false;
					},
					(error: ErrorApiResponse) => {
						alert(error.errorMessage);
					}
				);
				break;
		}
	}

	delete(element: StationLine) {
		const i = this.elements.indexOf(element);

		if (i > -1) {
			this.elements.splice(i, 1);

			this.elementTable.renderRows();
		}
	}

	addLineStation(value: Station|Line) {
		let element: StationLine = null;

		if (this.isLine) {
			element = {station: value, lineId: this.selectedElement.id, stationId: value.id};
		} else {
			element = {line: value, lineId: value.id, stationId: this.selectedElement.id};
		}

		if (this.elements.find(f => f.stationId === element.stationId && f.lineId === element.lineId) === undefined) {
			this.elements.push(element);

			this.elementTable.renderRows();
		}
	}

	saveLineStations() {
		if (this.isLine) {
			const line: Line = this.selectedElement;

			line.stations = this.elements;

			this.adminService.editLine$Json({id: line.id, body: line}).subscribe(
				(success: boolean) => {
					//
				},
				(error: ErrorApiResponse) => {
					alert(error.errorMessage);
				}
			);
		} else {
			const station: Station = this.selectedElement;

			station.lines = this.elements;

			this.adminService.editStation$Json({id: station.id, body: station}).subscribe(
				(success: boolean) => {
					//
				},
				(error: ErrorApiResponse) => {
					alert(error.errorMessage);
				}
			);
		}
	}
}
