// component to display set of decks

import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {Router} from "@angular/router";
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
}
