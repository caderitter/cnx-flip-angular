// component to display deck detail

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import 'rxjs/add/operator/switchMap';
import {Card} from "./card";

@Component({
  selector: 'deck-detail',
  templateUrl: './static/deck-detail.component.html'
})

export class DeckDetailComponent implements OnInit {
  deck: Deck;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.deckService.getDeck(+params['id']))
      .subscribe(deck => this.deck = deck);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.deckService.updateDeck(this.deck);
  }

  deleteDeck(deck: Deck): void {
    this.deckService.deleteDeck(deck.id);
    this.goBack();
  }

  addCard(term: string, def: string): void {
    var card = new Card(1, term, def);

  }

}
