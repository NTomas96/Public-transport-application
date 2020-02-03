/* tslint:disable */
import { Line } from './line';
import { Station } from './station';
export interface StationLine {
  line?: null | Line;
  lineId?: number;
  station?: null | Station;
  stationId?: number;
}
