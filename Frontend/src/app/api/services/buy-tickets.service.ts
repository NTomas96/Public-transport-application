/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Ticket } from '../models/ticket';
import { TicketType } from '../models/ticket-type';

@Injectable({
  providedIn: 'root',
})
export class BuyTicketsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiBuyTicketsTicketTypeOrderIdPost
   */
  static readonly ApiBuyTicketsTicketTypeOrderIdPostPath = '/api/BuyTickets/{ticketType}/{orderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buyTicket()` instead.
   *
   * This method doesn't expect any request body.
   */
  buyTicket$Response(params: {
    ticketType: TicketType;
    orderId: string;

  }): Observable<StrictHttpResponse<Ticket>> {

    const rb = new RequestBuilder(this.rootUrl, BuyTicketsService.ApiBuyTicketsTicketTypeOrderIdPostPath, 'post');
    if (params) {

      rb.path('ticketType', params.ticketType);
      rb.path('orderId', params.orderId);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Ticket>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buyTicket$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  buyTicket(params: {
    ticketType: TicketType;
    orderId: string;

  }): Observable<Ticket> {

    return this.buyTicket$Response(params).pipe(
      map((r: StrictHttpResponse<Ticket>) => r.body as Ticket)
    );
  }

}
