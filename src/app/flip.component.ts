import {Component, Input, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import {Card} from "./card";
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
  //term: string = this.deck.card[0].term;
  //current term, string definition
  private currentCard: Card;
  private currentCardIndex: number = 0;

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
    this.currentCard = this.deck.cards[this.currentCardIndex];
  }

  // listen for spacebar keyup
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if (ev.keyCode == 32) {
      this.flipCard();
    }
    // listen for right arrow keyup
    else if (ev.keyCode == 39) { 
      this.nextCard();
    }
    // listen for left arrow keyup 
    else if (ev.keyCode == 37) {
      this.previousCard();
    }
  }

  // use jquery because it takes 1 line vs angular's stupid and convoluted methods
  flipCard(): void {
    $('.flashcard').toggleClass('flipped');
  }

//methods: previous card, next card 
  nextCard(): void {
    this.currentCardIndex += 1;

    if (this.currentCardIndex == this.deck.cards.length) {
      this.currentCardIndex = 0;
    }
    this.currentCard = this.deck.cards[this.currentCardIndex];
    
  }

  previousCard(): void {
    this.currentCardIndex -= 1;
    if (this.currentCardIndex < 0) {
      this.currentCardIndex = this.deck.cards.length-1;
    }
    this.currentCard = this.deck.cards[this.currentCardIndex];
  }
}
