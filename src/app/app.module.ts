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
import {CardFormComponent} from "./card-form.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgLoadingBarModule} from 'ng-loading-bar';
import {TooltipModule} from 'ngx-bootstrap';
import {FlipComponent} from "./flip.component";
import {NotFoundComponent} from "./not-found.component";
import {LandingComponent} from "./landing.component";
import {CardContainerComponent} from "./card-container.component";
import {BookService} from "./book.service";
import {ChooseBookComponent} from "./choose-book.book-sync.component";
import {ChooseModuleComponent} from "./choose-module.book-sync.component";
import {BookTreeComponent} from "./book-tree.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
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
