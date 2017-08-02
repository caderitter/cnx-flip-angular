import {Component, Input, ViewChild, Output, EventEmitter} from '@angular/core';

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
  @Output() onCreateCard = new EventEmitter<any>();

  // declare "term" input field (id="focusable") so we can refocus to it when the user enters a card with tab or enter
  // key
  @ViewChild('focusable') vc: any;

  constructor(private deckService: DeckService) {}

  term: string;
  def: string;

  addCard(event: any): void {
    if (this.term && this.def) {

      this.deckService.createCard()

      this.term = "";
      this.def = "";

      // prevent tab from refocusing when using tab to submit new card
      if (event.keyCode == 9) {
        event.preventDefault();
        this.vc.nativeElement.focus();
      } else {
        this.vc.nativeElement.focus();
      }
    } else {
      // TODO - trigger error display
    }
  }
}
