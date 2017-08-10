// module file which declares all dependencies/data sources (providers)/imports

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {DeckService} from "./services/deck.service";
import {DecksComponent} from "./components/decks/decks.component";
import {DeckDetailComponent} from "./components/deck-detail/deck-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {CardFormComponent} from "./components/card-form/card-form.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgLoadingBarModule} from 'ng-loading-bar';
import {TooltipModule} from 'ngx-bootstrap';
import {FlipComponent} from "./components/flip/flip.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LandingComponent} from "./components/landing/landing.component";
import {CardContainerComponent} from "./components/card-container/card-container.component";
import {BookService} from "./services/book.service";
import {ChooseBookComponent} from "./components/choose-book.book-sync/choose-book.book-sync.component";
import {ChooseModuleComponent} from "./components/choose-module.book-sync/choose-module.book-sync.component";
import {BookTreeComponent} from "./components/book-tree/book-tree.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    NgLoadingBarModule.forRoot(),
    TooltipModule.forRoot(),
  ],

  declarations: [
    AppComponent,
    DecksComponent,
    DeckDetailComponent,
    CardFormComponent,
    FlipComponent,
    NotFoundComponent,
    LandingComponent,
    CardContainerComponent,
    ChooseBookComponent,
    ChooseModuleComponent,
    BookTreeComponent,
  ],

  providers: [
    DeckService,
    BookService,
  ],

  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
