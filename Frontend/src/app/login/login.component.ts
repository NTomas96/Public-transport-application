import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {ApiService} from "../api/api.service";


@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	matcher = new MyErrorStateMatcher();

	constructor(private fb: FormBuilder, private apiService: ApiService) {}

	onSubmit() {
		this.apiService.loginUser(this.loginForm.value, {
			success: (data) => {
				ApiService.setJwtToken(data.Token as string);
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});

	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}
}
