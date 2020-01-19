/* tslint:disable */
import { PassengerType } from './passenger-type';
import { TicketType } from './ticket-type';
export interface Pricelist {
  id?: number;
  passengerType?: PassengerType;
  price?: number;
  ticketType?: TicketType;
}
