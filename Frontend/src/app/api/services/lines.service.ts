/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BusJson } from '../models/bus-json';
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
   * Path part for operation apiLinesGet
   */
  static readonly ApiLinesGetPath = '/api/Lines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLines()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLines$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Line>>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.ApiLinesGetPath, 'get');
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
   * This method doesn't expect any request body.
   */
  getLines(params?: {

  }): Observable<Array<Line>> {

    return this.getLines$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Line>>) => r.body as Array<Line>)
    );
  }

  /**
   * Path part for operation apiLinesWithStationsGet
   */
  static readonly ApiLinesWithStationsGetPath = '/api/Lines/withStations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLinesWithStations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLinesWithStations$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Line>>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.ApiLinesWithStationsGetPath, 'get');
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
   * This method doesn't expect any request body.
   */
  getLinesWithStations(params?: {

  }): Observable<Array<Line>> {

    return this.getLinesWithStations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Line>>) => r.body as Array<Line>)
    );
  }

  /**
   * Path part for operation apiLinesIdGet
   */
  static readonly ApiLinesIdGetPath = '/api/Lines/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLine$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Line>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.ApiLinesIdGetPath, 'get');
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
   * This method doesn't expect any request body.
   */
  getLine(params: {
    id: number;

  }): Observable<Line> {

    return this.getLine$Response(params).pipe(
      map((r: StrictHttpResponse<Line>) => r.body as Line)
    );
  }

  /**
   * Path part for operation apiLinesBusPost
   */
  static readonly ApiLinesBusPostPath = '/api/Lines/bus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bus$Json()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  bus$Json$Response(params?: {

    body?: BusJson
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, LinesService.ApiLinesBusPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json-patch+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `bus$Json$Response()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  bus$Json(params?: {

    body?: BusJson
  }): Observable<boolean> {

    return this.bus$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
