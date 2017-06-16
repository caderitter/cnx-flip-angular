// module file which declares all dependencies/data sources (providers)/imports

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DashboardComponent}  from './dashboard.component';
import {AppComponent} from "./app.component";
import {DeckService} from "./deck.service";
import {DecksComponent} from "./decks.component";
import {DeckDetailComponent} from "./deck-detail.component";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService}  from './in-memory-data.service';
import {CardFormComponent} from "./card-form.component";
import {CardService} from "./card.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    DecksComponent,
    DeckDetailComponent,
    CardFormComponent,
  ],

  providers: [
    DeckService,
    CardService,
  ],

  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
