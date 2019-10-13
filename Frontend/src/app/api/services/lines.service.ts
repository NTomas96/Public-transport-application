/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Line } from '../models/line';

@Injectable({
  providedIn: 'root',
})
export class LinesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getLines
   */
  static readonly GetLinesPath = '/api/Lines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLines()` instead.
   *
   * This method doesn't expect any response body
   */
  getLines$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Line>>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.GetLinesPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Line>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLines$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getLines(params?: {

  }): Observable<Array<Line>> {

    return this.getLines$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Line>>) => r.body as Array<Line>)
    );
  }

  /**
   * Path part for operation getLinesWithStations
   */
  static readonly GetLinesWithStationsPath = '/api/Lines/withStations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLinesWithStations()` instead.
   *
   * This method doesn't expect any response body
   */
  getLinesWithStations$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Line>>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.GetLinesWithStationsPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Line>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLinesWithStations$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getLinesWithStations(params?: {

  }): Observable<Array<Line>> {

    return this.getLinesWithStations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Line>>) => r.body as Array<Line>)
    );
  }

  /**
   * Path part for operation getLine
   */
  static readonly GetLinePath = '/api/Lines/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLine()` instead.
   *
   * This method doesn't expect any response body
   */
  getLine$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Line>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.GetLinePath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Line>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLine$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getLine(params: {
    id: number;

  }): Observable<Line> {

    return this.getLine$Response(params).pipe(
      map((r: StrictHttpResponse<Line>) => r.body as Line)
    );
  }

}
