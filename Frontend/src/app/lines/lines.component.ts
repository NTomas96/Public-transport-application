import { Component } from "@angular/core";

@Component({
  selector: "app-lines",
  templateUrl: "./lines.component.html",
  styleUrls: ["./lines.component.css"]
})
export class LinesComponent {
	title = "Mreza linija";
	lat = 44.2743;
	lng = 19.8903;
	zoom = 14;

	stations = [
		{lat: 44.293706, lon: 19.969968},
		{lat: 44.293293, lon: 19.960744},
		{lat: 44.273918, lon: 19.905305}];

	lines = [
		{ id: 0, name: "1",
			waypoints: [
				{lat: 44.293706, lon: 19.969968},
				{lat: 44.293439, lon: 19.961678},
				{lat: 44.293293, lon: 19.960744},
				{lat: 44.290278, lon: 19.954519},
				{lat: 44.288696, lon: 19.950264},
				{lat: 44.273918, lon: 19.905305}]
			}
	];
}
