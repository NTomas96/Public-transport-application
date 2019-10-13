import {Injectable} from "@angular/core";
import {UserType} from "../api/models/user-type";

@Injectable({
	providedIn: "root",
})

export class UserLogin {
	jwtToken: string = null;
	userType: UserType = null;

	constructor() {
		const jwtToken = localStorage.getItem("jwtToken");
		const userType = localStorage.getItem("userType");

		if (jwtToken !== null && userType !== null) {
			this.jwtToken = jwtToken;
			this.userType = UserType[userType];
		}
	}

	login(jwtToken: string, userType: UserType) {
		this.jwtToken = jwtToken;
		this.userType = userType;

		localStorage.setItem("jwtToken", jwtToken);
		localStorage.setItem("userType", UserType[userType]);
	}

	logout() {
		this.jwtToken = null;
		this.userType = null;

		localStorage.removeItem("jwtToken");
		localStorage.removeItem("userType");
	}

	isLoggedIn(): boolean {
		return this.jwtToken !== null;
	}
}
