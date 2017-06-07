import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DashboardComponent}  from './dashboard.component';
import {AppComponent} from "./app.component";
import {DeckService} from "./deck.service";

@NgModule({
  imports: [
    BrowserModule
  ],

  declarations: [
    AppComponent,
    DashboardComponent
  ],

  providers: [
    DeckService
  ],

  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
