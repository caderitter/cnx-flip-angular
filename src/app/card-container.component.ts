import {Component, Input} from "@angular/core";
import {Deck} from "./deck";
import {Card} from "./card";
import {DeckService} from "./deck.service";

@Component({
  selector: 'card-container',
  templateUrl: './static/card-container.component.html',
})

export class CardContainerComponent {
  @Input() deck: Deck;

  constructor(
    private deckService: DeckService,
  ) {}

  deleteCard(card: Card): void {
    this.deck.cards = this.deck.cards.filter(c => c !== card);
    this.deckService.updateDeck(this.deck);
  }

}
