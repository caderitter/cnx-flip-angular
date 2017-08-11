/**
 * Component to list cards and allow editing and deleting of them.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Deck} from "../../models/deck";
import {Card} from "../../models/card";
import {DeckService} from "../../services/deck.service";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css',]
})

export class CardContainerComponent implements OnInit {
  // This gets the deck from the parent (deck-detail). We get this by specifying the deck
  // as input in the template for deck-detail. @Input() receives all changes to the
  // deck state - no need to subscribe to anything.
  @Input() deck: Deck;

  // object to track which term and defs have visible input fields
  public cardInput = {'def': {}, 'term': {}};

  constructor(
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
    // populate cardInput object
    this.deck.cards.forEach(card => {
      this.cardInput['def'][card.id] = false;
      this.cardInput['term'][card.id] = false;
    });
  }

  deleteCard(card: Card): void {
    this.deckService.deleteCard(card);
  }

  // toggles input field given corresponding card and type 'term' or 'def'
  toggleInput(card: Card, type: string): void {
    this.cardInput[type][card.id] = !this.cardInput[type][card.id]
  }

  // returns boolean whether given card's input 'term' or 'def' is visible
  getInputVisible(card: Card, type: string): boolean {
    return this.cardInput[type][card.id];
  }

  saveCard(card: Card, type: string): void {
    this.deckService.updateCard(card);
    this.toggleInput(card, type);
  }
}
