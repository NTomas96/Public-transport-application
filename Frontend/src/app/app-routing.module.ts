import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LinesComponent} from "./lines/lines.component";
import {TimetableComponent} from "./timetable/timetable.component";
import {LivemapComponent} from "./livemap/livemap.component";
import {PricesComponent} from "./prices/prices.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserverifyComponent} from "./userverify/userverify.component";
import {TicketverifyComponent} from "./ticketverify/ticketverify.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminlinesComponent} from "./admin/adminlines/adminlines.component";
import {AdminbusesComponent} from "./admin/adminbuses/adminbuses.component";
import {AdminpricelistsComponent} from "./admin/adminpricelists/adminpricelists.component";
import {AdmintimetablesComponent} from "./admin/admintimetables/admintimetables.component";
import {AdminstationsComponent} from "./admin/adminstations/adminstations.component";
import {EditstationComponent} from "./admin/adminstations/editstation/editstation.component";
import {EditlineComponent} from "./admin/adminlines/editline/editline.component";

const routes: Routes = [
	{path: "home", component: HomeComponent},
	{path: "", component: HomeComponent},
	{path: "lines", component: LinesComponent},
	{path: "timetable", component: TimetableComponent},
	{path: "livemap", component: LivemapComponent},
	{path: "prices", component: PricesComponent},
	{path: "login", component: LoginComponent},
	{path: "register", component: RegisterComponent},
	{path: "logout", component: LogoutComponent},
	{path: "profile", component: ProfileComponent},
	{path: "userverify", component: UserverifyComponent},
	{path: "ticketverify", component: TicketverifyComponent},
	{path: "admin", component: AdminComponent},
	{path: "admin/lines", component: AdminlinesComponent},
	{path: "admin/stations", component: AdminstationsComponent},
	{path: "admin/timetables", component: AdmintimetablesComponent},
	{path: "admin/pricelists", component: AdminpricelistsComponent},
	{path: "admin/buses", component: AdminbusesComponent},
	{path: "admin/stations/edit", component: EditstationComponent},
	{path: "admin/stations/edit/:id", component: EditstationComponent},
	{path: "admin/lines/edit", component: EditlineComponent},
	{path: "admin/lines/edit/:id", component: EditlineComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
