import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	constructor(private http: HttpClient) {
		const value = localStorage.getItem("jwtToken");
		const value2 = localStorage.getItem("userRole");
		if (value !== null && value2 !== null) {
			this.setJwtToken(value, parseInt(value2, 10));
		}
	}


	private jwtKey = null;
	private userRole = null;

	setJwtToken(token: string, userRole: number) {
		this.jwtKey = token;
		this.userRole = userRole;

		if (token !== null) {
			localStorage.setItem("jwtToken", token);
			localStorage.setItem("userRole", "" + userRole);
		} else {
			localStorage.removeItem("jwtToken");
			localStorage.removeItem("userRole");
		}

	}

	loggedIn() {
		return this.jwtKey !== null;
	}

	getRole() {
		return this.userRole;
	}

	getHttpOptions(auth?: boolean) {
		if ( !auth) {
			return {
				headers: new HttpHeaders({
					"Content-Type": "application/json"
				}),
				observe: "response" as "response" // javascript wtf
			};
		} else {
			return {
				headers: new HttpHeaders({
					"Content-Type": "application/json",
					Authorization: "Bearer " + this.jwtKey
				}),
				observe: "response" as "response" // javascript wtf
			};
		}
	}

	private handleResponse(data: HttpResponse<any>, callbackObject) {

		let member = "body";
		if (data instanceof HttpErrorResponse) {
			member = "error";
		}

		console.log(member);

		if (data[member] && "Success" in data[member]) {
			if (data[member].Success) {
				callbackObject.success(data[member].Value);
			} else {
				callbackObject.error(data[member].ErrorCode, data[member].ErrorMessage);
			}
		} else {
			callbackObject.error(1000, "Error while reaching server.");
		}
	}

	private apiRequest(method: string, callbackObject, auth?: boolean) {
		this.http.get<any>(environment.apiUrl + method, this.getHttpOptions(auth)).subscribe((data: HttpResponse<any>) => {
			this.handleResponse(data, callbackObject);
		}, (error) => {
			this.handleResponse(error, callbackObject);
		});
	}

	private apiPostRequest(method: string, postBody, callbackObject, auth?: boolean) {
		this.http.post<any>(environment.apiUrl + method, postBody, this.getHttpOptions(auth)).subscribe((data: HttpResponse<any>) => {
			this.handleResponse(data, callbackObject);

			console.log(data);
		}, (error) => {
			this.handleResponse(error, callbackObject);
			console.log(error);
		});
	}

	getLinesWithStations(callbackObject) {
		this.apiRequest("Lines/WithStations", callbackObject);
	}

	getLines(callbackObject) {
		this.apiRequest("Lines", callbackObject);
	}

	getStations(callbackObject) {
		this.apiRequest("Stations", callbackObject);
	}

	getLine(id, callbackObject) {
		this.apiRequest("Lines/" + id, callbackObject);
	}

	registerUser(user, callbackObject) {
		this.apiPostRequest("Users/Register", user, callbackObject);
	}

	loginUser(user, callbackObject) {
		this.apiPostRequest("Users/Login", user, callbackObject);
	}

	editProfileUser(user, callbackObject) {
		this.apiPostRequest("Users/EditProfile", user, callbackObject, true);
	}

	getTimetable(line, date, callbackObject)  {
		this.apiRequest("Timetables/" + line + "?date=" + date, callbackObject);
	}

	getTicketPrice(selectedTicketType, selectedPassengerType, callbackObject) {
		this.apiRequest("Pricelists/" + selectedTicketType + "/" + selectedPassengerType, callbackObject);
	}

	getUser(callbackObject) {
		this.apiRequest("Users/Me", callbackObject, true);
	}

	getUnverifiedUsers(callbackObject) {
		this.apiRequest("Users/Unverified", callbackObject, true);
	}
}
