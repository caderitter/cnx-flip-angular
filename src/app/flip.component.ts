import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'flip',
  templateUrl: './static/flip.component.html',
})

export class FlipComponent implements OnInit {
  deck: Deck;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.deckService.getDeck(+params['id']))
      .subscribe(deck => this.deck = deck);
  }

}
