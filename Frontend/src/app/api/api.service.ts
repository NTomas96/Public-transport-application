import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	constructor(private http: HttpClient) {
	}

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	};

	private static extractData(res: Response) {
		return res || {};
	}

	getLinesWithStations(): Observable<any> {
		return this.http.get(environment.apiUrl + "Lines/WithStations", this.httpOptions).pipe(
			map(ApiService.extractData));
	}

	getLines(): Observable<any> {
		return this.http.get(environment.apiUrl + "Lines", this.httpOptions).pipe(
			map(ApiService.extractData));
	}

	getStations(): Observable<any> {
		return this.http.get(environment.apiUrl + "Stations", this.httpOptions).pipe(
			map(ApiService.extractData));
	}

	getLine(id): Observable<any> {
		return this.http.get(environment.apiUrl + "Lines/" + id, this.httpOptions).pipe(
			map(ApiService.extractData));
	}
}
