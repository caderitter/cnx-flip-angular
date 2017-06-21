import {Component, Input, ViewChild} from '@angular/core';

import {Card} from './card';
import {CardService} from './card.service'
import {DeckService} from "./deck.service";
import {Deck} from "./deck";

@Component({
  selector: 'card-form',
  templateUrl: './static/card-form.component.html'
})

export class CardFormComponent {
  @Input() deck: Deck;
  @ViewChild('focusable') vc: any;
  model = new Card("Cade", "A decent person");
  submitted = false;
  term: string;
  def: string;


  constructor(
    private cardService: CardService,
    private deckService: DeckService
  ) {}

  onSubmit() { this.submitted = true; }

  addCard(): void {
    if (this.term && this.def) {
      console.log("Card added: " + this.term + ": " + this.def);
      var card = new Card(this.term, this.def);
      this.deck.cards.push(card);
      this.deckService.updateDeck(this.deck);
      this.term = "";
      this.def = "";
      this.vc.nativeElement.focus();
    }
  }
}
