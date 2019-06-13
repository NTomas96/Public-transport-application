import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		console.warn(this.loginForm.value);
	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			username: ["", Validators.required],
			password: ["", Validators.required]
		});
	}
}
