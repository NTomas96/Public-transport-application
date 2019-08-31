import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	constructor(private http: HttpClient) {
		const value = localStorage.getItem("jwtToken");
		if (value !== null) {
			this.setJwtToken(value);
		}
	}


	private jwtKey = null;

	setJwtToken(token: string) {
		this.jwtKey = token;

		if (token !== null) {
			localStorage.setItem("jwtToken", token);
		} else {
			localStorage.removeItem("jwtToken");
		}

	}

	loggedIn() {
		return this.jwtKey !== null;
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
		}, (error) => {
			this.handleResponse(error, callbackObject);
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

	getTimetable(line, date, callbackObject)  {
		this.apiRequest("Timetables/" + line + "?date=" + date, callbackObject);
	}

	getTicketPrice(selectedTicketType, selectedPassengerType, callbackObject) {
		this.apiRequest("Pricelists/" + selectedTicketType + "/" + selectedPassengerType, callbackObject);
	}

	getUser(callbackObject) {
		this.apiRequest("Users/Me", callbackObject, true);
	}
}
