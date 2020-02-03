/* tslint:disable */
import { StationLine } from './station-line';
export interface Station {
  id?: number;
  lat?: number;
  lines?: null | Array<StationLine>;
  lon?: number;
  name?: null | string;
}
