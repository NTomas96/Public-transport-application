import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {ErrorApiResponse} from "../api/models";
import {UserLogin} from "../shared/user-login";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(private userLogin: UserLogin) {}

	private static isErrorApiResonse(object: any): object is ErrorApiResponse {
		return "errorCode" in object;
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log("Making a request. JWT Token: ", this.userLogin.jwtToken);

		return next.handle(request).pipe(
			map(
				(event) => {

					if (event instanceof HttpResponse) {
						if (event.status === 200 && event.body !== null && "success" in event.body && "value" in event.body && event.body.success === true) {
							event = event.clone({
								body: event.body.value
							});
						} else {
							throwError({
								status: false,
								errorCode: 1,
								errorMessage: "Unknown error"
							} as ErrorApiResponse);
						}
					}

					return event;
				}
			),
			catchError((err) => {
				if (! ApiInterceptor.isErrorApiResonse(err)) { // wtf typescript
					if (err instanceof HttpErrorResponse) {
						// tslint:disable-next-line:max-line-length
						if (err.error !== null && "success" in err.error && err.error.success === false && "errorCode" in err.error && "errorMessage" in err.error) {
							return throwError(err.error as ErrorApiResponse);
						}
					}

					return throwError({
						status: false,
						errorCode: 1,
						errorMessage: "Unknown error"
					} as ErrorApiResponse);
				}

				return throwError(err);
			})
		);
	}
}
