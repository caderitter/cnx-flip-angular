// component to show all decks

import {Component} from '@angular/core';
import {Deck} from "./deck";

@Component({
  selector: 'index',
  template: `
  <h3>Dashboard</h3>
  <nav>
    <a routerLink="/dashboard">Dashboard</a>
    <a routerLink="/decks">Decks</a>  
  </nav>
  `,
})

export class DashboardComponent {

}
