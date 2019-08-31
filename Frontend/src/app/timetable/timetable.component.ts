import {Component, OnInit} from "@angular/core";
import {ApiService} from "../api/api.service";
import {MatSelectChange} from "@angular/material";

@Component({
	selector: "app-timetable",
	templateUrl: "./timetable.component.html",
	styleUrls: ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit {

	constructor(private apiService: ApiService) {

	}
	title = "Red voznje";

	lineTypes = [
		{id: 0, name: "Gradska"},
		{id: 1, name: "Prigradska"}
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

	lines: any[] = [];
	linesShown = false;
	selectedLines = [];
	dateChosen: string = null;
	lineSelected: number = null;
	selectedTimetable = null;

	selectedTimetableSorted = null;
	displayColumns = null;

	ngOnInit(): void {
		this.apiService.getLinesWithStations({
			success: (lines) => {
				this.lines = lines;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
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
			if ( line.LineType === $event.value) {
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

		this.apiService.getTimetable(line, time, {
			success: (timetable) => {
				console.log(timetable);
				const tmpObj = {};
				this.selectedTimetableSorted = [];

				for (const depTime of timetable.Departures) {
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

				console.log(max);

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

				console.log(tmpObj);
				console.log(this.selectedTimetableSorted);
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}
}
