import { Component, OnInit } from "@angular/core";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

	constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

	matcherEmail = new MyErrorStateMatcher();

	editProfileForm = this.fb.group({
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(6)]],
		confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
		dayOfBirth: ["", [Validators.required]],
		address: ["", [Validators.required]]
	});

	ngOnInit() {
		if (! this.apiService.loggedIn()) {
			this.router.navigateByUrl("/login");
		}

		this.apiService.getUser({
			success: (user) => {
				this.editProfileForm.setValue({
					firstName: user.FirstName,
					lastName: user.LastName,
					email: user.Email,
					password: user.Password,
					confirmPassword: user.Password,
					dayOfBirth: user.DayOfBirth,
					address: user.Address
				}, {emitEvent: false});
				console.log(user);
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}

	onSubmit() {
		this.apiService.editProfileUser(this.editProfileForm.value, {
			success: (data) => {
				// TODO: do something with server response
			},
			error: (code, message) => {
				alert("Error " + message);
			}
		});
	}



}
