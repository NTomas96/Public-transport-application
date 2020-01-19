/* tslint:disable */
import { DayOfWeek } from './day-of-week';
import { Line } from './line';
export interface Timetable {
  dayOfWeek?: DayOfWeek;
  departures?: null | Array<number>;
  id?: number;
  line?: null | Line;
}
