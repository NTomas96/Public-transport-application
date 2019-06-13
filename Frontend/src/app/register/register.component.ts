import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import {MyErrorStateMatcher} from "../mailErrorCathcer";

@Component({
  	selector: "app-registration",
  	templateUrl: "./register.component.html",
  	styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

	passagerTypes = ["Student", "Pensioner", "Regular"];

	matcherEmail = new MyErrorStateMatcher();
	matcherPassword = new MyErrorStateMatcher();

	registrationForm = this.fb.group({
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(6)]],
		confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
		dayOfBirth: ["", [Validators.required]],
		address: ["", [Validators.required]],
		passagerType: [this.passagerTypes[0], [Validators.required]],
		aditionalInfo: [""],
	});

  	constructor(private fb: FormBuilder) { }

  	ngOnInit() {
  	}

	onSubmit() {
		console.warn(this.registrationForm.value);
	}
}
