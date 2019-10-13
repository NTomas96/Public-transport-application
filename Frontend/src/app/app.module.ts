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
	MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatCardModule
} from "@angular/material";

import {LinesComponent} from "./lines/lines.component";
import {TimetableComponent} from "./timetable/timetable.component";
import {LivemapComponent} from "./livemap/livemap.component";
import {PricesComponent} from "./prices/prices.component";
import {LoginComponent} from "./login/login.component";
import {AgmCoreModule} from "@agm/core";
import {RegisterComponent} from "./register/register.component";
import {HttpClientModule} from "@angular/common/http";
import {LogoutComponent } from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {UserverifyComponent} from "./userverify/userverify.component";
import {InfodialogComponent} from "./userverify/infodialog/infodialog.component";
import {NgxPayPalModule} from "ngx-paypal";
import {TicketdialogComponent} from "./prices/ticketdialog/ticketdialog.component";
import {TicketverifyComponent} from "./ticketverify/ticketverify.component";
import {ApiModule} from "./api/api.module";
import {httpInterceptorProviders} from "./http-interceptors";
@NgModule({
	declarations: [
		PageComponent,
		HomeComponent,
		LinesComponent,
		TimetableComponent,
		LivemapComponent,
		PricesComponent,
		LoginComponent,
		RegisterComponent,
		LogoutComponent,
		ProfileComponent,
		UserverifyComponent,
		InfodialogComponent,
		TicketdialogComponent,
		TicketverifyComponent,
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
		MatNativeDateModule,
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyDuUc5PE9D64mJOBPUzEIHAs0gTTo_86Sc" // Google Maps API key
		}),
		ApiModule.forRoot({ rootUrl: "http://localhost:56014" }),
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatDatepickerModule,
		MatDatepickerModule,
		MatTableModule,
		MatPaginatorModule,
		MaterialFileInputModule,
		MatCardModule,
		NgxPayPalModule
	],
	providers: [httpInterceptorProviders],
	bootstrap: [PageComponent],
	entryComponents: [InfodialogComponent, TicketdialogComponent]
})
export class AppModule {
}
