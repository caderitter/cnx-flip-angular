import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DashboardComponent}  from './dashboard.component';
import {AppComponent} from "./app.component";

@NgModule({
  imports: [
    BrowserModule
  ],

  declarations: [
    AppComponent,
    DashboardComponent
  ],

  bootstrap: [
    AppComponent,
    DashboardComponent
  ]

})
export class AppModule { }
