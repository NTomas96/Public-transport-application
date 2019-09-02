import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";

import {CustomValidators} from "../shared/custom.Validators";

import {FileInput} from "ngx-material-file-input";


@Component({
  	selector: "app-registration",
  	templateUrl: "./register.component.html",
  	styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

	constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
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
			email: "Unesite ispravnu email adresu.",
		},
		password: {
			required: "Niste uneneli lozinku.",
			minlength: "Greska pri unosu (min 6 karaktera).",
		},
		confirmPassword: {
			required: "Niste ponovili lozinku.",
		},
		passwordGroup: {
			passwordMismatch: "Lozinke se ne poklapaju, potvrdi lozinku ponovo.",
		},
		dayOfBirth: {
			required: "Unesite datum rodjnja.",
		},
		address: {
			required: "Unesite adresu.",
		},
		passengerType: {
			required: "Izaberite tip putnika.",
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

	passengerTypes = ["Regularani", "Student", "Penzioner"];

	matcherEmail = new MyErrorStateMatcher();

	registrationForm = this.fb.group({
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		passwordGroup: this.fb.group ({
			password: ["", [Validators.required, Validators.minLength(6)]],
			confirmPassword: ["", [Validators.required]]
		}, {validator: CustomValidators.checkPassword}),
		dayOfBirth: ["", [Validators.required]],
		address: ["", [Validators.required]],
		passengerType: [0, [Validators.required]],
		additionalInfo: [null]
	});

	hideP: boolean;
	hideCP: boolean;

	additionalInfo = null;

  	ngOnInit() {
		if (this.apiService.loggedIn()) {
			this.router.navigateByUrl("/profile");
		}
		this.hideP = true;
		this.hideCP = true;

		this.registrationForm.valueChanges.subscribe((data) => {
			this.logValidationErrors(this.registrationForm);
		});
  	}

  	logValidationErrors(group: FormGroup = this.registrationForm): void {
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

		this.registrationForm.value.password = this.registrationForm.value.passwordGroup.password;
		this.registrationForm.value.additionalInfo = this.additionalInfo;

		this.apiService.registerUser(this.registrationForm.value, {
			success: (data) => {
				this.router.navigateByUrl("/login");
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	onFileChanged() {
		if (this.registrationForm.value.additionalInfo !== null && this.registrationForm.value.additionalInfo instanceof FileInput) {
			const reader  = new FileReader();
			reader.addEventListener("load", () => {
				this.additionalInfo = reader.result;
			}, false);

			reader.readAsDataURL(this.registrationForm.value.additionalInfo.files[0]);
		}
	}
}
