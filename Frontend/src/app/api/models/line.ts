/* tslint:disable */
import { GeoLocation } from './geo-location';
import { LineType } from './line-type';
import { StationLine } from './station-line';
export interface Line  {
  color?: null | string;
  id?: number;
  lineType?: LineType;
  name?: null | string;
  stations?: null | Array<StationLine>;
  waypoints?: null | Array<GeoLocation>;
}
