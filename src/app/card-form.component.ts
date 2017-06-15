import {Component} from '@angular/core';

import {Card} from './card';

@Component({
  selector: 'card-form',
  templateUrl: './static/card-form.component.html'
})

export class CardFormComponent {

  model = new Card(666, "Cade", "A decent person");

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
