import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	constructor(private http: HttpClient) {
	}


	static jwtKey = "";

	static setJwtToken(token: string) {
		ApiService.jwtKey = token;
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

	getTimetables(): Observable<any> {
		return this.http.get(environment.apiUrl + "Timetables", this.httpOptions).pipe(map(ApiService.extractData));
	}
}
