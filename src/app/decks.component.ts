// component to display set of decks

import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";

@Component({
  selector: 'decks',
  templateUrl: './static/decks.component.html',
})

export class DecksComponent implements OnInit {
  decks: Deck[] = [];

  constructor(
    private deckService: DeckService,
    private router: Router,
  ) {}

  getDecks(): void {
    this.deckService.getDecks()
      .then(decks => this.decks = decks);
  }

  // TODO - if not authenticated, get decks from localstorage
  ngOnInit(): void {
    this.getDecks();
  }

  addDeck(): void {
    this.deckService.createDeck("New deck")
      .then(deck => {
        this.decks.push(deck);
        this.router.navigate(['/deck-detail/' + deck.id]);
      });
  }
}
