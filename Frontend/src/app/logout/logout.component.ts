import {Component, OnInit} from "@angular/core";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.component.html",
	styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {

	constructor(private apiService: ApiService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.apiService.setJwtToken(null, null);
			this.router.navigateByUrl("/login");
		}, 0);

	}

}
