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
	{path: "ticketverify", component: TicketverifyComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
