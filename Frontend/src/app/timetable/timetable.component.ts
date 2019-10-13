import {Component, OnInit} from "@angular/core";
import {MatSelectChange} from "@angular/material";
import {TimetablesService} from "../api/services/timetables.service";
import {LinesService} from "../api/services/lines.service";
import {Line} from "../api/models/line";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {Timetable} from "../api/models/timetable";
import {LineType} from "../api/models/line-type";

@Component({
	selector: "app-timetable",
	templateUrl: "./timetable.component.html",
	styleUrls: ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit {

	constructor(private linesService: LinesService, private timetablesService: TimetablesService) {

	}

	lineTypes = [
		{id: LineType.CityLine, name: "Gradska"},
		{id: LineType.SuburbanLine, name: "Prigradska"}
	];

	dayNames = [
		"Nedelja",
		"Ponedeljak",
		"Utorak",
		"Sreda",
		"Cetvrtak",
		"Petak",
		"Subota"
	];

	lines: Line[] = [];
	linesShown = false;
	selectedLines: Line[] = [];
	dateChosen: string = null;
	lineSelected: number = null;
	selectedTimetable: Timetable = null;

	selectedTimetableSorted = null;
	displayColumns = null;

	ngOnInit(): void {
		this.linesService.getLinesWithStations().subscribe(
			(data: Array<Line>) => {
				this.lines = data;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	dateChanged(data) {
		this.dateChosen = data.value;

		if (this.lineSelected != null) {
			this.updateTimetable(this.dateChosen, this.lineSelected);
		}
	}

	lineTypeChanged($event: MatSelectChange) {
		this.selectedLines = [];
		for (const line of this.lines) {
			if ( line.lineType === $event.value) {
				this.selectedLines.push(line);
			}
		}

		this.linesShown = true;
	}

	lineChanged($event: MatSelectChange) {
		this.lineSelected = $event.value;

		if (this.dateChosen != null) {
			this.updateTimetable(this.dateChosen, this.lineSelected);
		}
	}

	updateTimetable(date: string, line: number) {

		const time = new Date(Date.parse(date)).toISOString();

		this.timetablesService.getTimetable({line, date: time}).subscribe(
			(timetable: Timetable) => {
				const tmpObj = {};
				this.selectedTimetableSorted = [];

				for (const depTime of timetable.departures) {
					const hour = Math.floor(depTime / 3600);

					if (!( hour in tmpObj)) {
						tmpObj[hour] = [];
					}

					const hours = (hour + "").padStart(2, "0");
					const minutes = (Math.floor((depTime - hour * 3600) / 60) + "").padStart(2, "0");

					tmpObj[hour].push(hours + ":" + minutes);
				}

				let max = -1;

				for (const row of Object.keys(tmpObj)) {

					if (tmpObj[row].length > max) {
						max = tmpObj[row].length;
					}
				}

				for (const row of Object.keys(tmpObj)) {
					if (tmpObj[row].length < max) {
						for (let i = 0; i < (max - tmpObj[row].length); i++) {
							tmpObj[row].push("");
						}
					}
				}


				this.displayColumns = [];

				for (let i = 0; i < max; i++) {
					this.displayColumns.push("" + i);
				}


				for (const row of Object.keys(tmpObj)) {
					const tmp = {};

					for (let i = 0; i < max; i++) {
						tmp[i] = tmpObj[row][i];
					}

					this.selectedTimetableSorted.push(tmp);
				}


				this.selectedTimetable = timetable;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}
}
