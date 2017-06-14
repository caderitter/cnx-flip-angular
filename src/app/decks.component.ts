// component to display set of decks

import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";

@Component({
  selector: 'decks',
  templateUrl: './static/decks.component.html',
})

export class DecksComponent implements OnInit {

  decks: Deck[];

  constructor(
    private deckService: DeckService
  ) {}

  // gets decks from the deck service
  getDecks(): void {
    this.deckService.getDecks().then(decks => this.decks = decks);
  }

  ngOnInit(): void {
    this.getDecks();
  }

  addDeck(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.deckService.createDeck(name)
      .then(hero => {
        this.decks.push(hero);
      });
  }

}
