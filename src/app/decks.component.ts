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

  constructor(
    private deckService: DeckService,
    private router: Router,
  ) {}

  // gets decks from the deck service
  getDecks(): void {
    this.deckService.getDecks().then(decks => this.decks = decks);
  }

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
