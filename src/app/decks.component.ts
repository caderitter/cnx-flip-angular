// component to display set of decks

import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";
import {Router} from "@angular/router";

@Component({
  selector: 'decks',
  templateUrl: './static/decks.component.html',
})

export class DecksComponent implements OnInit {
  decks: Deck[];

  constructor(private deckService: DeckService, private router: Router) {}

  ngOnInit(): void {
    this.deckService.getDecks().then(decks => this.decks = decks);
  }

  addDeck(): void {
    this.deckService.createDeck()
      .then(deck => this.router.navigate(['deck-detail', deck.id]));
  }
}
