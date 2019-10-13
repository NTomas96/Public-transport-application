import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserLogin} from "../shared/user-login";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.component.html",
	styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {

	constructor(private userLogin: UserLogin, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.userLogin.logout();
			this.router.navigateByUrl("/login");
		}, 0);

	}

}
