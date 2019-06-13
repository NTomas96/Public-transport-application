import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  	selector: "app-registration",
  	templateUrl: "./registration.component.html",
  	styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {

	passagerTypes = ["Student", "Pensioner", "Regular"];

	registrationForm = this.fb.group({
		firstName: ["", Validators.required],
		lastName: ["", Validators.required],
		email: ["", Validators.required, Validators.email],
		password: ["", Validators.required, Validators.minLength(6)],
		confirmPassword: ["", Validators.required, Validators.minLength(6)],
		dayOfBirth: ["", Validators.required],
		address: ["", Validators.required],
		passagerType: [this.passagerTypes[0], Validators.required],
		aditionalInfo: [""],
	});

  	constructor(private fb: FormBuilder) { }

  	ngOnInit() {
  	}

	onSubmit() {
		console.warn(this.registrationForm.value);
	}
}
