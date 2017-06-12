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

  selectedDeck: Deck;
  decks: Deck[];

  constructor(
    private router: Router,
    private deckService: DeckService
  ) {}

  // gets decks from the deck service
  getDecks(): void {
    this.decks = this.deckService.getDecks();
  }

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
  }

  // currently unused - [routerLink] replaces its functionality in decks.component.html
  gotoDetail(id: number): void {
    this.router.navigate(['/deck-detail', id]);
    console.log("Navigating to deck %d...", id);
  }

  ngOnInit(): void {
    this.getDecks();
  }
}
