import {Component, Input, ViewChild, Output, EventEmitter} from '@angular/core';

import {Card} from '../../models/card';
import {DeckService} from "../../services/deck.service";
import {Deck} from "../../models/deck";

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html'
})

export class CardFormComponent {
  @Input() deck: Deck;

  // declare "term" input field (id="focusable") so we can refocus to it when the user enters a card with tab or enter
  // key
  @ViewChild('focusable') vc: any;

  constructor(private deckService: DeckService) {}

  term: string;
  def: string;

  addCard(event: any): void {
    if (this.term && this.def) {

      this.deckService.createCard(this.deck.id, this.term, this.def);

      this.term = "";
      this.def = "";

      // prevent tab from refocusing when using tab to submit new card
      if (event) {
        if (event.keyCode == 9) {
          event.preventDefault();
          this.vc.nativeElement.focus();
        } else {
          this.vc.nativeElement.focus();
        }
      }
    } else {
      // TODO - trigger error display
    }
  }
}
