import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard.component';
import {DeckDetailComponent} from "./deck-detail.component";
import {DecksComponent} from "./decks.component";
import {FlipComponent} from "./flip.component";
import {NotFoundComponent} from "./not-found.component";
import {LandingComponent} from "./landing.component";

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
    path: 'dashboard',
    component: DashboardComponent
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
