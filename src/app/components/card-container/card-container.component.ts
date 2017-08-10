import {Component, Input, OnInit} from "@angular/core";
import {Deck} from "../../models/deck";
import {Card} from "../../models/card";
import {DeckService} from "../../services/deck.service";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
})

export class CardContainerComponent implements OnInit {
  @Input() deck: Deck;

  // objects to track which term and defs have visible input fields
  public cardInput = {'def': {}, 'term': {}};


  constructor(
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
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
