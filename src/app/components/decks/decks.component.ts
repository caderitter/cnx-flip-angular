// component to display set of decks

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

  constructor(private deckService: DeckService, private router: Router) {}

  ngOnInit(): void {
    this.deckService.getDecks().then(decks => this.decks = decks);
  }

  addDeck(): void {
    this.deckService.createDeck()
      .then(deck => this.router.navigate(['deck-detail', deck.id]));
  }
}
