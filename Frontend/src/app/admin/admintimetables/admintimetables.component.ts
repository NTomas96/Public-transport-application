import {Component, OnInit, ViewChild} from "@angular/core";
import {Line} from "../../api/models/line";
import {AdminService} from "../../api/services/admin.service";
import {ErrorApiResponse} from "../../api/models/error-api-response";
import {DayOfWeek} from "../../api/models/day-of-week";
import {Timetable} from "../../api/models/timetable";
import {Time} from "@angular/common";

@Component({
	selector: "app-admintimetables",
	templateUrl: "./admintimetables.component.html",
	styleUrls: ["./admintimetables.component.css"]
})
export class AdmintimetablesComponent implements OnInit {

	private lines: Line[];
	private daysInWeek: any[];
	private selectedTimetable: Timetable;

	private displayColumns = [
		{key: "time", name: "Vreme", auto: false},
		{key: "actions", name: "Akcije", auto: false},
	];

	private displayColumnsParsed = Array.from(this.displayColumns, (x) => x.key);
	private timePattern = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$";

	@ViewChild("timeTable") timeTable;

	constructor(private adminService: AdminService) {
		this.lines = [];

		this.daysInWeek = [
			{id: DayOfWeek.Monday, name: "Ponedeljak"},
			{id: DayOfWeek.Tuesday, name: "Utorak"},
			{id: DayOfWeek.Wednesday, name: "Sreda"},
			{id: DayOfWeek.Thursday, name: "Cetvrtak"},
			{id: DayOfWeek.Friday, name: "Petak"},
			{id: DayOfWeek.Saturday, name: "Subota"},
			{id: DayOfWeek.Sunday, name: "Nedelja"},
		];
	}

	ngOnInit() {
		this.selectedTimetable = null;
		this.lines = [];

		this.adminService.getLines().subscribe(
			(lines: Line[]) => {
				this.lines = lines;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);
	}

	private timeStampToHumanTime(timestamp: number, includeSeconds: boolean = true): string {
		const hours = Math.floor(timestamp / 3600);
		const hoursStr = (hours + "").padStart(2, "0");

		const minutes = Math.floor((timestamp - hours * 3600) / 60);
		const minutesStr = (minutes + "").padStart(2, "0");

		if (!includeSeconds) {
			return hoursStr + ":" + minutesStr;
		}

		const seconds = (timestamp - hours * 3600 - minutes * 60);
		const secondsStr = (seconds + "").padStart(2, "0");

		return hoursStr + ":" + minutesStr + ":" + secondsStr;
	}

	private humanTimeToTimestamp(humanTime: string): number {
		const parts = humanTime.split(":");

		let time = 0;

		if (parts.length >= 2) {
			time += parseInt(parts[0], 10) * 3600;
			time += parseInt(parts[1], 10) * 60;

			if (parts.length === 3) {
				time += parseInt(parts[2], 10);
			}

			return time;
		}

		return -1;
	}

	selectLine(lineId: number, day: DayOfWeek) {

		this.adminService.getTimeTable({lineId, day}).subscribe(
			(value: Timetable) => {
				this.selectedTimetable = value;
			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);
	}

	delete(element: number) {
		const i = this.selectedTimetable.departures.indexOf(element);

		if (i > -1) {
			this.selectedTimetable.departures.splice(i, 1);

			this.timeTable.renderRows();
		}
	}

	saveTimeTable() {
		const table = this.selectedTimetable;
		this.adminService.editTimeTable$Json({lineId: table.line.id, day: table.dayOfWeek, body: table}).subscribe(
			(success: boolean) => {

			},
			(error: ErrorApiResponse) => {
				alert(error.errorMessage);
			}
		);
	}

	addTime(value: string) {
		const time = this.humanTimeToTimestamp(value);

		this.selectedTimetable.departures.push(time);
		this.selectedTimetable.departures.sort();

		this.timeTable.renderRows();
	}
}
