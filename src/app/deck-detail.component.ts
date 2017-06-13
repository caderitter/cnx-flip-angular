// component to display deck detail

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";

@Component({
  selector: 'deck-detail',
  templateUrl: './static/deck-detail.component.html'
})

export class DeckDetailComponent implements OnInit {
  @Input() deck: Deck;

  private sub: any;
  id: number;

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

}
