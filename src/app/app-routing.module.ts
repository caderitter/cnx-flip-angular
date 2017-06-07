import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard.component';
import {DeckDetailComponent} from "./deck-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail', component: DeckDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
