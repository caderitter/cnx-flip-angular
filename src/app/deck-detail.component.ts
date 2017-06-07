// component to display deck detail

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";

@Component({
  selector: 'deck-detail',
  templateUrl: './static/html/deck-detail.component.html'
})

export class DeckDetailComponent implements OnInit {
  @Input() deck: Deck;

  private deckService: DeckService;
  private route: ActivatedRoute;
  private location: Location;

  ngOnInit(): void {
    this.deck = this.deckService.getDeck(+this.route.params['id']);
  }

  goBack(): void {
    this.location.back();
  }

}
