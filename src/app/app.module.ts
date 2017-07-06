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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgLoadingBarModule} from 'ng-loading-bar';
import {TooltipModule} from 'ngx-bootstrap';
import {LocalStorageService} from "./local-storage.service";
import {FlipComponent} from "./flip.component";
import {NotFoundComponent} from "./not-found.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    NgLoadingBarModule.forRoot(),
    TooltipModule.forRoot(),
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    DecksComponent,
    DeckDetailComponent,
    CardFormComponent,
    FlipComponent,
    NotFoundComponent,
  ],

  providers: [
    DeckService,
    CardService,
    LocalStorageService,
  ],

  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
