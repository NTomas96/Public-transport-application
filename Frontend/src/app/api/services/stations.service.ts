/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Station } from '../models/station';

@Injectable({
  providedIn: 'root',
})
export class StationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiStationsGet
   */
  static readonly ApiStationsGetPath = '/api/Stations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStations$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Station>>> {

    const rb = new RequestBuilder(this.rootUrl, StationsService.ApiStationsGetPath, 'get');
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

}
