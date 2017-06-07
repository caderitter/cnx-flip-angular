// component to show all decks

import {Component} from '@angular/core';
import {Deck} from "./deck";

@Component({
  selector: 'index',
  template: `
  <h1>Dashboard</h1>
  <decks></decks>
  `,
})

export class DashboardComponent {

}
