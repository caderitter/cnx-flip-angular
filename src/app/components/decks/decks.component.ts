/**
 * Component to display list of user's decks, or add a new one.
 */

import {Component, OnInit} from "@angular/core";
import {Deck} from "../../models/deck";
import {DeckService} from "../../services/deck.service";
import {Router} from "@angular/router";

@Component({
  selector: 'decks',
  templateUrl: './decks.component.html',
})

export class DecksComponent implements OnInit {
  decks: Deck[];
  loading: boolean;

  constructor(private deckService: DeckService, private router: Router) {
    this.loading = true;
  }

  ngOnInit(): void {
    // we don't subscribe here, because this component doesn't modify data
    // without switching components. We just get the latest set of decks.
    this.deckService.getDecks().then(decks => {
      this.loading = false;
      this.decks = decks;
    });
  }

  addDeck(): void {
    this.deckService.createDeck()
      .then(deck => this.router.navigate(['deck-detail', deck.id]));
  }
}
