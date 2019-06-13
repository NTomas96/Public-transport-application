import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {PageComponent} from "./page/page.component";
import {HomeComponent} from "./home/home.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
	MatButtonModule,
	MatCheckboxModule,
	MatSidenavModule,
	MatListModule,
	MatToolbarModule,
	MatIconModule,
	MatGridListModule,
	MatFormFieldModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule,
	MatDatepickerModule
} from "@angular/material";

import {LinesComponent} from "./lines/lines.component";
import {TimetableComponent} from "./timetable/timetable.component";
import {LivemapComponent} from "./livemap/livemap.component";
import {PricesComponent} from "./prices/prices.component";
import {LoginComponent} from "./login/login.component";
import {AgmCoreModule} from "@agm/core";
import {RegisterComponent} from "./register/register.component";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./api/api.service";

@NgModule({
	declarations: [
		PageComponent,
		HomeComponent,
		LinesComponent,
		TimetableComponent,
		LivemapComponent,
		PricesComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSidenavModule,
		MatListModule,
		MatToolbarModule,
		MatIconModule,
		MatGridListModule,
		MatOptionModule,
		MatSelectModule,
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyCLn-niMlI4zaZVqToyMaFmFCw_qAryqa4" // Google Maps API key
		}),
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatDatepickerModule,
		MatDatepickerModule
	],
	providers: [ApiService],
	bootstrap: [PageComponent]
})
export class AppModule {
}
