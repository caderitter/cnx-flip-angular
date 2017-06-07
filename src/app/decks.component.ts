// component to display set of decks

import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {Router} from "@angular/router";
import {DeckService} from "./deck.service";

@Component({
  selector: 'decks',
  templateUrl: './static/decks.component.html',
  styleUrls: [
    './static/css/3-col-portfolio.css',
    './static/css/bootstrap.css',
    './static/css/bootstrap.min.css'
  ]
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

  gotoDetail(id: number): void {
    this.router.navigate(['/deck-detail', this.selectedDeck.id]);
    console.log("Navigating to deck %d...", this.selectedDeck.id);
  }

  ngOnInit(): void {
    this.getDecks();
  }
}
