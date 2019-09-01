import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";


@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	matcher = new MyErrorStateMatcher();

	constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {}

	onSubmit() {
		this.apiService.loginUser(this.loginForm.value, {
			success: (data) => {
				this.apiService.setJwtToken(data.Token as string, data.UserType);
				this.router.navigateByUrl("/home");
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});

	}

	ngOnInit(): void {

		if (this.apiService.loggedIn()) {
			this.router.navigateByUrl("/profile");
		}

		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}
}
