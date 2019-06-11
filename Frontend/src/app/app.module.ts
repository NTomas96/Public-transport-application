import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { PageComponent } from "./page/page.component";
import { HomeComponent } from "./home/home.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule
} from "@angular/material";

import { LinesComponent } from "./lines/lines.component";
import { TimetableComponent } from "./timetable/timetable.component";
import { LivemapComponent } from "./livemap/livemap.component";
import { PricesComponent } from "./prices/prices.component";

@NgModule({
  declarations: [
	  PageComponent,
	  HomeComponent,
	  LinesComponent,
	  TimetableComponent,
	  LivemapComponent,
	  PricesComponent
  ],
  imports: [
	  BrowserModule,
	  AppRoutingModule,
	  BrowserAnimationsModule,
	  MatButtonModule,
	  MatCheckboxModule,
	  MatSidenavModule,
	  MatListModule,
	  MatToolbarModule,
	  MatIconModule,
	  MatGridListModule
  ],
  providers: [],
  bootstrap: [PageComponent]
})
export class AppModule { }
