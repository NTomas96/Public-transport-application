/* tslint:disable */
import { Line } from './line';
import { Station } from './station';
export interface StationLine  {
  line?: Line;
  lineId?: number;
  station?: Station;
  stationId?: number;
}
