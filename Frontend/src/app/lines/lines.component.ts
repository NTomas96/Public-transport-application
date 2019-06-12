import { Component } from "@angular/core";
import { MapTypeStyle } from "@agm/core";

@Component({
  selector: "app-lines",
  templateUrl: "./lines.component.html",
  styleUrls: ["./lines.component.css"]
})
export class LinesComponent {
	title = "Mreza linija";
	lat = 44.2743;
	lng = 19.8903;
	zoom = 14;

	mapStyle = [({
		featureType: "transit.station.bus",
		stylers: [{ visibility: "off" }]
	} as MapTypeStyle)];

	stations = [
		{name: "Iverak", lat: 44.293703, lon: 19.969926},
		{name: "Donja Grabovica", lat: 44.280422, lon: 19.925059},
		{name: "Krusik", lat: 44.273954, lon: 19.905367},
		{name: "Jadar", lat: 44.270037, lon: 19.880293},
		{name: "Pecina", lat: 44.264710, lon: 19.877333},
		{name: "Lovci", lat: 44.262021, lon: 19.871741},
		{name: "Sezam 014", lat: 44.285014, lon: 19.879352},
		{name: "Tri Lipe", lat: 44.277631, lon: 19.883678},
		{name: "Gimnazija", lat: 44.269950, lon: 19.886363},
		{name: "OMNI Centar", lat: 44.263858, lon: 19.891543},
		{name: "Uzicka", lat: 44.261731, lon: 19.897532},
		{name: "Dukat", lat: 44.253205, lon: 19.901889}];

	lines = [
		{ id: 0, name: "1",
			waypoints: [
				{lat: 44.293703, lon: 19.969926},
				{lat: 44.293403, lon: 19.961447},
				{lat: 44.293282, lon: 19.960780},
				{lat: 44.293042, lon: 19.960142},
				{lat: 44.290321, lon: 19.954599},
				{lat: 44.280422, lon: 19.925059},
				{lat: 44.273954, lon: 19.905367},
				{lat: 44.273675, lon: 19.904292},
				{lat: 44.273299, lon: 19.896677},
				{lat: 44.273407, lon: 19.895316},
				{lat: 44.274420, lon: 19.890322},
				{lat: 44.273946, lon: 19.879934},
				{lat: 44.270037, lon: 19.880293},
				{lat: 44.269720, lon: 19.878823},
				{lat: 44.268433, lon: 19.877569},
				{lat: 44.267158, lon: 19.877238},
				{lat: 44.264710, lon: 19.877333},
				{lat: 44.263217, lon: 19.876740},
				{lat: 44.262776, lon: 19.875910},
				{lat: 44.261962, lon: 19.873048},
				{lat: 44.262021, lon: 19.871741}]
			},
		{ id: 1, name: "2",
			waypoints: [
				{lat: 44.285014, lon: 19.879352},
				{lat: 44.283787, lon: 19.879596},
				{lat: 44.282921, lon: 19.880173},
				{lat: 44.281584, lon: 19.880403},
				{lat: 44.280153, lon: 19.881296},
				{lat: 44.278988, lon: 19.882812},
				{lat: 44.278700, lon: 19.883069},
				{lat: 44.277631, lon: 19.883678},
				{lat: 44.277215, lon: 19.883827},
				{lat: 44.274204, lon: 19.883840},
				{lat: 44.272182, lon: 19.883930},
				{lat: 44.272276, lon: 19.886125},
				{lat: 44.269950, lon: 19.886363},
				{lat: 44.268406, lon: 19.886538},
				{lat: 44.267653, lon: 19.886456},
				{lat: 44.267518, lon: 19.886677},
				{lat: 44.267426, lon: 19.887056},
				{lat: 44.266761, lon: 19.889269},
				{lat: 44.266736, lon: 19.889550},
				{lat: 44.266653, lon: 19.889792},
				{lat: 44.263858, lon: 19.891543},
				{lat: 44.263312, lon: 19.892108},
				{lat: 44.263236, lon: 19.893400},
				{lat: 44.263188, lon: 19.893521},
				{lat: 44.263186, lon: 19.893700},
				{lat: 44.262663, lon: 19.895781},
				{lat: 44.261731, lon: 19.897532},
				{lat: 44.261436, lon: 19.898048},
				{lat: 44.258475, lon: 19.901435},
				{lat: 44.256505, lon: 19.902325},
				{lat: 44.256067, lon: 19.902467},
				{lat: 44.255195, lon: 19.902503},
				{lat: 44.254460, lon: 19.902362},
				{lat: 44.253205, lon: 19.901889}]
		},
		{ id: 2, name: "3",
			waypoints: [
				{lat: 44.285014, lon: 19.879352}]}
	];
}
