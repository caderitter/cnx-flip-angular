import {Component, Input, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {Card} from "./card";
import {DeckService} from "./deck.service";
import {CardService} from "./card.service";

@Component({
  selector: 'card-container',
  templateUrl: './static/card-container.component.html',
})

export class CardContainerComponent implements OnInit {
  @Input() deck: Deck;

  private cards: Card[] = [];

  // objects to track which term and defs have visible input fields
  public cardTermInput = {};
  public cardDefInput = {};

  constructor(
    private deckService: DeckService,
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    // this.deck.cards.forEach(id => {
    //   this.cardService.getCard(id)
    //     .then(card => this.cards.push(card));
    //   this.cardTermInput[id] = false;
    //   this.cardDefInput[id] = false;
    // });
    this.deck.cards.forEach(card => {
      this.cardTermInput[card.id] = false;
      this.cardDefInput[card.id] = false;
    });
  }

  deleteCard(card: Card): void {
    // this.cardService.deleteCard(id);
    // var i = this.deck.cards.indexOf(id);
    // if(i != -1) {
    //   this.deck.cards.splice(i, 1);
    // }
    // this.deckService.updateDeck(this.deck);
    this.deckService.deleteCard(card)
      .then(deck => this.deck = deck);
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
    this.deckService.updateCard(this.deck, card)
      .then(deck => this.deck = deck);
    this.toggleInput(card, type);
  }
}
