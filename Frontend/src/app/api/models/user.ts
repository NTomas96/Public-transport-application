/* tslint:disable */
import { PassengerType } from './passenger-type';
import { UserType } from './user-type';
import { VerificationStatus } from './verification-status';
export interface User {
  active?: boolean;
  additionalInfo?: null | string;
  address?: null | string;
  dayOfBirth?: string;
  email?: null | string;
  firstName?: null | string;
  id?: number;
  lastName?: null | string;
  passengerType?: PassengerType;
  password?: null | string;
  userType?: UserType;
  verificationStatus?: VerificationStatus;
}
