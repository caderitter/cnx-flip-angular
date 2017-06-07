// component to show all decks

import {Component} from '@angular/core';
import {Deck} from "./deck";

@Component({
  selector: 'index',
  template: `<h1>Index view</h1>`,
})

export class DashboardComponent {
  name = 'OpenStax Flip';
  decks: Deck[] = [];
}
