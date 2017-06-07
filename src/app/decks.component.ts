import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {Router} from "@angular/router";
import {DeckService} from "./deck.service";

@Component({
  selector: 'decks',
  templateUrl: './static/html/decks.component.html'
})

export class DecksComponent implements OnInit {

  selectedDeck: Deck;
  decks: Deck[];

  constructor(
    private router: Router,
    private deckService: DeckService
  ) {}

  // TODO: call to Pyramid API
  // calls backend API to return decks, currently plugged into mock service
  getDecks(): void {
    this.decks = this.deckService.getDecks();
  }

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
  }

  gotoDetail(): void {
    this.router.navigate(['/decks', this.selectedDeck.id]);
  }

  ngOnInit(): void {
    this.getDecks();
  }
}
