import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
	MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatCardModule, MatProgressSpinnerModule
} from "@angular/material";

import {LinesComponent} from "./lines/lines.component";
import {TimetableComponent} from "./timetable/timetable.component";
import {LivemapComponent} from "./livemap/livemap.component";
import {PricesComponent} from "./prices/prices.component";
import {LoginComponent} from "./login/login.component";
import {AgmCoreModule} from "@agm/core";
import {RegisterComponent} from "./register/register.component";
import {HttpClientModule} from "@angular/common/http";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {UserverifyComponent} from "./userverify/userverify.component";
import {InfodialogComponent} from "./userverify/infodialog/infodialog.component";
import {NgxPayPalModule} from "ngx-paypal";
import {TicketdialogComponent} from "./prices/ticketdialog/ticketdialog.component";
import {TicketverifyComponent} from "./ticketverify/ticketverify.component";
import {ApiModule} from "./api/api.module";
import {httpInterceptorProviders} from "./http-interceptors";
import {AdminComponent} from "./admin/admin.component";
import {AdminlinesComponent} from "./admin/adminlines/adminlines.component";
import {AdminstationsComponent} from "./admin/adminstations/adminstations.component";
import {AdmintimetablesComponent} from "./admin/admintimetables/admintimetables.component";
import {AdminpricelistsComponent} from "./admin/adminpricelists/adminpricelists.component";
import {AdminbusesComponent} from "./admin/adminbuses/adminbuses.component";
import {EditstationComponent} from "./admin/adminstations/editstation/editstation.component";
import {DialogComponent} from "./dialog/dialog.component";
import {EditlineComponent} from "./admin/adminlines/editline/editline.component";
import {ColorPickerModule} from "ngx-color-picker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {environment} from "../environments/environment";

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
		AdminComponent,
		AdminlinesComponent,
		AdminstationsComponent,
		AdmintimetablesComponent,
		AdminpricelistsComponent,
		AdminbusesComponent,
		EditstationComponent,
		EditlineComponent,
		DialogComponent,
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
			apiKey: environment.gmapsApiKey // Google Maps API key
		}),
		ApiModule.forRoot({rootUrl: environment.apiUrl}),
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
		NgxPayPalModule,
		MatProgressSpinnerModule,
		ColorPickerModule,
		FormsModule,
		MatTooltipModule
	],
	providers: [httpInterceptorProviders],
	bootstrap: [PageComponent],
	entryComponents: [InfodialogComponent, TicketdialogComponent, DialogComponent]
})
export class AppModule {
}
