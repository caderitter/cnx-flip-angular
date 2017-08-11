import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeckDetailComponent} from "./components/deck-detail/deck-detail.component";
import {DecksComponent} from "./components/decks/decks.component";
import {FlipComponent} from "./components/flip/flip.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LandingComponent} from "./components/landing/landing.component";
import {ChooseBookComponent} from "./components/choose-book.book-sync/choose-book.book-sync.component";
import {ChooseModuleComponent} from "./components/choose-module.book-sync/choose-module.book-sync.component";
import {StudyComponent} from "./components/study/study.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },

  {
    path: 'landing',
    component: LandingComponent
  },

  {
    path: 'decks',
    component: DecksComponent,
  },

  {
    path: 'deck-detail/:id',
    children: [

      {
        path: '',
        pathMatch: 'full',
        component: DeckDetailComponent
      },

      {
        path: 'flip',
        component: FlipComponent
      },

      {
        path: 'study',
        component: StudyComponent
      },

      {
        path: 'book-sync',
        children: [

          {
            path: ':uuid',
            component: ChooseModuleComponent
          },

          {
            path: '',
            pathMatch: 'full',
            component: ChooseBookComponent
          }
        ]
      }
    ]
  },

  {
    path: '404',
    component: NotFoundComponent
  },

  {
    path: '**',
    redirectTo: '/404'
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
