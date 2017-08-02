// component to display set of decks

import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";
import {Router} from "@angular/router";
import {Subscription, Observable} from "rxjs";

@Component({
  selector: 'decks',
  templateUrl: './static/decks.component.html',
})

export class DecksComponent implements OnInit {
  decks: Observable<Deck[]>;

  constructor(private deckService: DeckService, private router: Router) {}

  ngOnInit(): void {
    this.decks = this.deckService.decksObservable;
    this.deckService.loadDecks();
  }

  addDeck(): void {
    let id = this.deckService.createDeck();
    if (id != -1) {
      this.router.navigate(['/deck-detail', id])
    }
  }
}
