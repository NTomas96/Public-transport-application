import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {FileInput} from "ngx-material-file-input";

@Component({
  	selector: "app-registration",
  	templateUrl: "./register.component.html",
  	styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

	constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
	}

	passengerTypes = ["Regularani", "Student", "Penzioner"];

	matcherEmail = new MyErrorStateMatcher();

	registrationForm = this.fb.group({
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(6)]],
		confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
		dayOfBirth: ["", [Validators.required]],
		address: ["", [Validators.required]],
		passengerType: [0, [Validators.required]],
		additionalInfo: [null]
	});

  	ngOnInit() {
		if (this.apiService.loggedIn()) {
			this.router.navigateByUrl("/profile");
		}
  	}

	onSubmit() {

		this.apiService.registerUser(this.registrationForm.value, {
			success: (data) => {
				// TODO: do something with server response
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
				this.registrationForm.value.additionalInfo = reader.result;
			}, false);

			reader.readAsDataURL(this.registrationForm.value.additionalInfo.files[0]);

		}
	}

	imageAvailable(): boolean {
  		return typeof(this.registrationForm.value.additionalInfo) === "string";
	}
}
