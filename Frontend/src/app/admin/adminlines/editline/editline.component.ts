import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../api/services/admin.service";
import {ErrorApiResponse} from "../../../api/models/error-api-response";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../../../dialog/dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MapTypeStyle} from "@agm/core";
import {Line} from "../../../api/models/line";
import {LineType} from "../../../api/models/line-type";

@Component({
	selector: "app-editline",
	templateUrl: "./editline.component.html",
	styleUrls: ["./editline.component.css"]
})
export class EditlineComponent implements OnInit {

	private line: Line = null;
	private isEdit: boolean;

	private formErrors = {
		id: "",
		name: "",
		color: "",
		lineType: "",
		waypoints: ""
	};

	private form = this.fb.group({
		id: [{value: "", disabled: true}],
		name: ["", [Validators.required]],
		color: ["", [Validators.required]],
		lineType: ["", [Validators.required]],
		waypoints: ["", []]
	});

	private buttonText: string;

	private lat = 44.2743;
	private lng = 19.8903;
	private zoom = 14;

	private mapStyle = [({
		featureType: "transit.station.bus",
		stylers: [{visibility: "off"}]
	} as MapTypeStyle)];

	private lineTypes = [
		{id: 0, name: "Gradska"},
		{id: 1, name: "Prigradska"}
	];

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private adminService: AdminService, private dialog: MatDialog) {
	}

	ngOnInit() {
		const param = this.route.snapshot.paramMap.get("id");

		this.line = {
			id: 0,
			name: "",
			color: "#ea9bff",
			lineType: LineType.CityLine,
			waypoints: []
		};

		if (param === null) {
			this.isEdit = false;
			this.buttonText = "Dodaj";

			this.form.patchValue(this.line);

		} else {
			const id: number = Number(param);

			this.isEdit = true;
			this.buttonText = "Sacuvaj";

			let dialogRef;

			setTimeout(() => dialogRef = this.dialog.open(DialogComponent, {
				disableClose: true,
				width: "150px",
				height: "150px"
			}), 0);

			this.adminService.getLine({id}).subscribe(
				(line: Line) => {
					this.line = line;
					this.form.patchValue(this.line);

					dialogRef.close();
				},
				(error: ErrorApiResponse) => {
					dialogRef.close();
					alert("Error " + error.errorMessage);
				}
			);
		}
	}

	logValidationErrors(group: FormGroup = this.form): void {
		Object.keys(group.controls).forEach((key: string) => {
			const abstractControl = group.get(key);

			this.formErrors[key] = "";
			if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
				const messages = this.form[key];

				for (const errorKey in abstractControl.errors) {
					if (errorKey) {
						this.formErrors[key] += messages[errorKey] + " ";
					}
				}
			}

			if (abstractControl instanceof FormGroup) {
				this.logValidationErrors(abstractControl);
			}
		});
	}

	onSubmit() {
		const value: Line = this.form.value;

		value.waypoints = this.line.waypoints;
		value.color = this.line.color;

		if (this.isEdit) {
			this.adminService.editLine$Json({id: this.line.id, body: value}).subscribe(
				() => {
					this.router.navigate(["/admin/lines"]);
				},
				(error: ErrorApiResponse) => {
					alert("Error " + error.errorMessage);
				}
			);
		} else {
			this.adminService.addLine$Json({body: value}).subscribe(
				() => {
					this.router.navigate(["/admin/lines"]);
				},
				(error: ErrorApiResponse) => {
					alert("Error " + error.errorMessage);
				}
			);
		}
	}

	deleteLastWaypoint() {
		this.line.waypoints.pop();
	}

	deleteAllWaypoints() {
		this.line.waypoints = [];
	}

	onMapClick($event) {
		this.line.waypoints.push({lat: $event.coords.lat, lon: $event.coords.lng});
	}
}
