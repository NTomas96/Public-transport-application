/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Timetable } from '../models/timetable';

@Injectable({
  providedIn: 'root',
})
export class TimetablesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTimetablesLineGet
   */
  static readonly ApiTimetablesLineGetPath = '/api/Timetables/{line}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTimetable()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTimetable$Response(params: {
    line: number;
    date?: string;

  }): Observable<StrictHttpResponse<Timetable>> {

    const rb = new RequestBuilder(this.rootUrl, TimetablesService.ApiTimetablesLineGetPath, 'get');
    if (params) {

      rb.path('line', params.line);
      rb.query('date', params.date);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Timetable>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTimetable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTimetable(params: {
    line: number;
    date?: string;

  }): Observable<Timetable> {

    return this.getTimetable$Response(params).pipe(
      map((r: StrictHttpResponse<Timetable>) => r.body as Timetable)
    );
  }

}
