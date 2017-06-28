import {Component, Input, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import 'rxjs/add/operator/switchMap';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'flip',
  templateUrl: './static/flip.component.html',
})

export class FlipComponent implements OnInit {
  deck: Deck;
  parentRouteId: number;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
    // get deck id from parent component
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
    });
    this.deckService.getDeck(this.parentRouteId).then(deck => this.deck = deck);
  }

  // listen for spacebar keyup
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if (ev.keyCode == 32) {
      this.flipCard();
    }
  }

  // use jquery because it takes 1 line vs angular's stupid and convoluted methods
  flipCard(): void {
    $('.flashcard').toggleClass('flipped');
  }



}
