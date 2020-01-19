/* tslint:disable */
import { TicketType } from './ticket-type';
import { User } from './user';
export interface Ticket {
  id?: number;
  payPalData?: null | string;
  payPalOrderId?: null | string;
  ticketNumber?: null | string;
  ticketType?: TicketType;
  timeBought?: string;
  user?: null | User;
}
