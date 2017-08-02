import {Component, Input, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {Card} from "./card";
import {DeckService} from "./deck.service";

@Component({
  selector: 'card-container',
  templateUrl: './static/card-container.component.html',
})

export class CardContainerComponent implements OnInit {
  @Input() deck: Deck;

  // objects to track which term and defs have visible input fields
  public cardTermInput = {};
  public cardDefInput = {};

  constructor(
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
    this.deck.cards.forEach(card => {
      this.cardTermInput[card.id] = false;
      this.cardDefInput[card.id] = false;
    });
  }

  deleteCard(card: Card): void {
    this.deckService.deleteCard(card);
  }

  // toggles input field given corresponding card and type 'term' or 'def'
  toggleInput(card: Card, type: string): void {
    if (type == 'term') {
      this.cardTermInput[card.id] = !this.cardTermInput[card.id];
    } else if (type == 'def') {
      this.cardDefInput[card.id] = !this.cardDefInput[card.id];
    } else {
      console.error("Invalid input type");
    }
  }

  // returns boolean whether given card's input 'term' or 'def' is visible
  getInputVisible(card: Card, type: string): boolean {
    if (type == 'term') {
      return this.cardTermInput[card.id];
    } else if (type == 'def') {
      return this.cardDefInput[card.id];
    } else {
      console.error("Invalid input type");
    }
  }

  saveCard(card: Card, type: string): void {
    this.deckService.updateCard(card);
    this.toggleInput(card, type);
  }
}
