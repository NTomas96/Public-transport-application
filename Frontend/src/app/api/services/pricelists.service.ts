/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PassengerType } from '../models/passenger-type';
import { Pricelist } from '../models/pricelist';
import { TicketType } from '../models/ticket-type';

@Injectable({
  providedIn: 'root',
})
export class PricelistsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPricelistMe
   */
  static readonly GetPricelistMePath = '/api/Pricelists/me/{ticketType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPricelistMe()` instead.
   *
   * This method doesn't expect any response body
   */
  getPricelistMe$Response(params: {
    ticketType: TicketType;

  }): Observable<StrictHttpResponse<Pricelist>> {

    const rb = new RequestBuilder(this.rootUrl, PricelistsService.GetPricelistMePath, 'get');
    if (params) {

      rb.path('ticketType', params.ticketType);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Pricelist>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPricelistMe$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getPricelistMe(params: {
    ticketType: TicketType;

  }): Observable<Pricelist> {

    return this.getPricelistMe$Response(params).pipe(
      map((r: StrictHttpResponse<Pricelist>) => r.body as Pricelist)
    );
  }

  /**
   * Path part for operation getPricelist
   */
  static readonly GetPricelistPath = '/api/Pricelists/{ticketType}/{passengerType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPricelist()` instead.
   *
   * This method doesn't expect any response body
   */
  getPricelist$Response(params: {
    ticketType: TicketType;
    passengerType: PassengerType;

  }): Observable<StrictHttpResponse<Pricelist>> {

    const rb = new RequestBuilder(this.rootUrl, PricelistsService.GetPricelistPath, 'get');
    if (params) {

      rb.path('ticketType', params.ticketType);
      rb.path('passengerType', params.passengerType);

    }
    debugger;
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Pricelist>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPricelist$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getPricelist(params: {
    ticketType: TicketType;
    passengerType: PassengerType;

  }): Observable<Pricelist> {

    return this.getPricelist$Response(params).pipe(
      map((r: StrictHttpResponse<Pricelist>) => r.body as Pricelist)
    );
  }

}
