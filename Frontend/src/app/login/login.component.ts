import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MyErrorStateMatcher} from "../mailErrorCathcer";


@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	matcher = new MyErrorStateMatcher();

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		console.warn(this.loginForm.value);
	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}
}
