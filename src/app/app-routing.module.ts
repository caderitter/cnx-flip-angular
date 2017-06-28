import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard.component';
import {DeckDetailComponent} from "./deck-detail.component";
import {DecksComponent} from "./decks.component";
import {FlipComponent} from "./flip.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
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
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
