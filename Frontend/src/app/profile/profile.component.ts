import { Component, OnInit } from "@angular/core";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../shared/custom.Validators";
import {FileInput} from "ngx-material-file-input";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

	constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
	}

	validationMessages = {
		firstName: {
			required: "Niste uneli ime."
		},
		lastName: {
			required: "Niste uneli Prezime."
		},
		email: {
			required: "Unesite email.",
			email: "Unesite ispravnu email adresu."
		},
		password: {
			required: "Niste uneneli lozinku.",
			minlength: "Greska pri unosu (min 6 karaktera)."
		},
		confirmPassword: {
			required: "Niste ponovili lozinku."
		},
		passwordGroup: {
			passwordMismatch: "Lozinke se ne poklapaju, potvrdi lozinku ponovo."
		},
		dayOfBirth: {
			required: "Unesite datum rodjnja."
		},
		address: {
			required: "Unesite adresu."
		},
		passengerType: {
			required: "Izaberite tip putnika."
		}
	};

	formErrors = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		passwordGroup: "",
		dayOfBirth: "",
		address: "",
		passengerType: ""
	};

	matcherEmail = new MyErrorStateMatcher();

	passengerTypes = ["Regularani", "Student", "Penzioner"];

	editProfileForm = this.fb.group({
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		passwordGroup: this.fb.group ({
			password: ["", [Validators.required, Validators.minLength(6)]],
			confirmPassword: ["", [Validators.required]]
		}, { validator: CustomValidators.checkPassword}),
		dayOfBirth: ["", [Validators.required]],
		address: ["", [Validators.required]],
		passengerType: [""],
		additionalInfo: [null]
	});

	hideP: boolean;
	hideCP: boolean;

	additionalInfo = null;

	ngOnInit() {
		if (! this.apiService.loggedIn()) {
			this.router.navigateByUrl("/login");
		}

		this.hideP = true;
		this.hideCP = true;

		this.editProfileForm.valueChanges.subscribe((data) => {
			this.logValidationErrors(this.editProfileForm);
		});

		this.apiService.getUser({
			success: (user) => {
				this.editProfileForm.setValue({
					firstName: user.FirstName,
					lastName: user.LastName,
					passwordGroup: {
						password: user.Password,
						confirmPassword: user.Password
					},
					email: user.Email,
					dayOfBirth: user.DayOfBirth,
					address: user.Address,
					passengerType: user.PassengerType,
					additionalInfo: user.AdditionalInfo
				}, {emitEvent: false});
				this.additionalInfo = user.AdditionalInfo;
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	logValidationErrors(group: FormGroup = this.editProfileForm): void {
		Object.keys(group.controls).forEach((key: string) => {
			const abstractControl = group.get(key);

			this.formErrors[key] = "";
			if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
				const messages = this.validationMessages[key];

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

		this.editProfileForm.value.password = this.editProfileForm.value.passwordGroup.password;
		this.editProfileForm.value.additionalInfo = this.additionalInfo;

		this.apiService.editProfileUser(this.editProfileForm.value, {
			success: (data) => {
				// TODO: do something with server response
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	onFileChanged() {
		if (this.editProfileForm.value.additionalInfo !== null && this.editProfileForm.value.additionalInfo instanceof FileInput) {
			const reader  = new FileReader();
			reader.addEventListener("load", () => {
				this.additionalInfo = reader.result;
			}, false);

			reader.readAsDataURL(this.editProfileForm.value.additionalInfo.files[0]);
		}
	}

}
