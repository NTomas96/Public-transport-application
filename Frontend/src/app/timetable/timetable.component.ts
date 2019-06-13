import {Component, OnInit, ViewChild} from "@angular/core";
import {ApiService} from "../api/api.service";
import {MatSelectChange} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
	selector: "app-timetable",
	templateUrl: "./timetable.component.html",
	styleUrls: ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit {

	constructor(private apiService: ApiService) {

	}
	title = "Red voznje";

	timetables = [];

	// displayedColumns: string[] = ["Dan u nedelji", "Vreme polska", "Linija"];
	// dataSource = new MatTableDataSource<any>(this.timetables);

	// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;*/

	ngOnInit(): void {
		this.apiService
			.getTimetables()
			.subscribe(
				(timetables) => {
					this.timetables = timetables;
				}
			);
		// this.dataSource.paginator = this.paginator;
	}
}
