import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {Router} from "@angular/router";

@Component({
  selector: 'decks',
  templateUrl: './static/html/decks.component.html'
})

export class DecksComponent implements OnInit {

  selectedDeck: Deck;
  decks: Deck[];

  constructor(
    private router: Router,
  ) {}

  // TODO: call to Pyramid API
  // calls backend API to return decks
  getDecks(): void {}

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedDeck.id]);
  }

  ngOnInit(): void {}
}
