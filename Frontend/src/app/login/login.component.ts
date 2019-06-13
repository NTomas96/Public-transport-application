import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent {
	title = "Login";

	loginForm = this.fb.group({
		username: ["", Validators.required],
		password: ["", Validators.required]
	});

	constructor(private fb: FormBuilder) {}

	OnSubmit() {
		console.warn(this.loginForm.value);
	}
}
