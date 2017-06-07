import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DashboardComponent}  from './dashboard.component';
import {AppComponent} from "./app.component";
import {DeckService} from "./deck.service";
import {DecksComponent} from "./decks.component";
import {DeckDetailComponent} from "./deck-detail.component";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    DecksComponent,
    DeckDetailComponent
  ],

  providers: [
    DeckService
  ],

  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
