import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../api/services/admin.service";
import {Station} from "../../../api/models/station";
import {ErrorApiResponse} from "../../../api/models/error-api-response";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../../../dialog/dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MapTypeStyle} from "@agm/core";

@Component({
	selector: "app-editstation",
	templateUrl: "./editstation.component.html",
	styleUrls: ["./editstation.component.css"]
})
export class EditstationComponent implements OnInit {

	private station: Station = null;
	private isEdit: boolean;

	private formErrors = {
		id: "",
		name: "",
		lat: "",
		lon: ""
	};

	private form = this.fb.group({
		id: [{value: "", disabled: true}],
		name: ["", [Validators.required]],
		lat: ["", [Validators.required]],
		lon: ["", [Validators.required]],
	});

	private buttonText: string;

	private lat = 44.2743;
	private lng = 19.8903;
	private zoom = 14;

	private mapStyle = [({
		featureType: "transit.station.bus",
		stylers: [{visibility: "off"}]
	} as MapTypeStyle)];

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private adminService: AdminService, private dialog: MatDialog) {
	}

	ngOnInit() {
		const param = this.route.snapshot.paramMap.get("id");

		if (param === null) {
			this.isEdit = false;
			this.buttonText = "Dodaj";

			this.station = {
				id: 0,
				name: "",
				lat: 0.0,
				lon: 0.0
			};
			this.form.patchValue(this.station);

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

			this.adminService.getStation({id}).subscribe(
				(station: Station) => {
					this.station = station;
					this.form.patchValue(this.station);

					this.lat = this.station.lat;
					this.lng = this.station.lon;

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
		const value: Station = this.form.value;

		if (this.isEdit) {
			this.adminService.editStation$Json({id: this.station.id, body: value}).subscribe(
				() => {
					this.router.navigate(["/admin/stations"]);
				},
				(error: ErrorApiResponse) => {
					alert("Error " + error.errorMessage);
				}
			);
		} else {
			this.adminService.addStation$Json({body: value}).subscribe(
				() => {
					this.router.navigate(["/admin/stations"]);
				},
				(error: ErrorApiResponse) => {
					alert("Error " + error.errorMessage);
				}
			);
		}
	}

	onMapClick($event) {
		this.station.lat = $event.coords.lat;
		this.station.lon = $event.coords.lng;

		const value = this.form.value;
		value.lat = this.station.lat;
		value.lon = this.station.lon;

		this.form.patchValue(value);
	}
}
