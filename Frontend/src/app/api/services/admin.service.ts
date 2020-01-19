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
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiAdminLinesGet
   */
  static readonly ApiAdminLinesGetPath = '/api/Admin/lines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLines()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLines$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Line>>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminLinesGetPath, 'get');
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
   * Path part for operation apiAdminLinesPost
   */
  static readonly ApiAdminLinesPostPath = '/api/Admin/lines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addLine$Json()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  addLine$Json$Response(params?: {

    body?: Line
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminLinesPostPath, 'post');
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
   * To access the full response (for headers, for example), `addLine$Json$Response()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  addLine$Json(params?: {

    body?: Line
  }): Observable<boolean> {

    return this.addLine$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiAdminLinesIdGet
   */
  static readonly ApiAdminLinesIdGetPath = '/api/Admin/lines/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLine$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Line>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminLinesIdGetPath, 'get');
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
   * Path part for operation apiAdminLinesIdPost
   */
  static readonly ApiAdminLinesIdPostPath = '/api/Admin/lines/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editLine$Json()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  editLine$Json$Response(params: {
    id: number;

    body?: Line
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminLinesIdPostPath, 'post');
    if (params) {

      rb.path('id', params.id);

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
   * To access the full response (for headers, for example), `editLine$Json$Response()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  editLine$Json(params: {
    id: number;

    body?: Line
  }): Observable<boolean> {

    return this.editLine$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiAdminLinesIdDelete
   */
  static readonly ApiAdminLinesIdDeletePath = '/api/Admin/lines/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLine()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLine$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminLinesIdDeletePath, 'delete');
    if (params) {

      rb.path('id', params.id);

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
   * To access the full response (for headers, for example), `deleteLine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLine(params: {
    id: number;

  }): Observable<boolean> {

    return this.deleteLine$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiAdminStationsGet
   */
  static readonly ApiAdminStationsGetPath = '/api/Admin/stations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStations$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Station>>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminStationsGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Station>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStations(params?: {

  }): Observable<Array<Station>> {

    return this.getStations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Station>>) => r.body as Array<Station>)
    );
  }

  /**
   * Path part for operation apiAdminStationsPost
   */
  static readonly ApiAdminStationsPostPath = '/api/Admin/stations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addStation$Json()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  addStation$Json$Response(params?: {

    body?: Station
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminStationsPostPath, 'post');
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
   * To access the full response (for headers, for example), `addStation$Json$Response()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  addStation$Json(params?: {

    body?: Station
  }): Observable<boolean> {

    return this.addStation$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiAdminStationsIdGet
   */
  static readonly ApiAdminStationsIdGetPath = '/api/Admin/stations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStation$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Station>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminStationsIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Station>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStation(params: {
    id: number;

  }): Observable<Station> {

    return this.getStation$Response(params).pipe(
      map((r: StrictHttpResponse<Station>) => r.body as Station)
    );
  }

  /**
   * Path part for operation apiAdminStationsIdPost
   */
  static readonly ApiAdminStationsIdPostPath = '/api/Admin/stations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editStation$Json()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  editStation$Json$Response(params: {
    id: number;

    body?: Station
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminStationsIdPostPath, 'post');
    if (params) {

      rb.path('id', params.id);

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
   * To access the full response (for headers, for example), `editStation$Json$Response()` instead.
   *
   * This method sends `application/json-patch+json` and handles request body of type `application/json-patch+json`.
   */
  editStation$Json(params: {
    id: number;

    body?: Station
  }): Observable<boolean> {

    return this.editStation$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiAdminStationsIdDelete
   */
  static readonly ApiAdminStationsIdDeletePath = '/api/Admin/stations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteStation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteStation$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminStationsIdDeletePath, 'delete');
    if (params) {

      rb.path('id', params.id);

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
   * To access the full response (for headers, for example), `deleteStation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteStation(params: {
    id: number;

  }): Observable<boolean> {

    return this.deleteStation$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
