import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {Router} from "@angular/router";
import {UsersService} from "../api/services/users.service";
import {User} from "../api/models/user";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {LoginResponse} from "../api/models/login-response";
import {UserLogin} from "../shared/user-login";


@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	matcher = new MyErrorStateMatcher();

	constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService, private userLogin: UserLogin) {}

	onSubmit() {
		this.usersService.login$Json({body: this.loginForm.value as User}).subscribe( // TODO: find out why this method has Json in its name
			(data: LoginResponse) => {
				this.userLogin.login(data.token, data.userType);
				this.router.navigateByUrl("/home");
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	ngOnInit(): void {
		if (this.userLogin.isLoggedIn()) {
			this.router.navigateByUrl("/profile");
		}

		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}
}
