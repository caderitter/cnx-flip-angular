import {Component, Input, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import {Card} from "./card";
import 'rxjs/add/operator/switchMap';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'flip',
  templateUrl: './static/flip.component.html',
  styles: [".list-group {padding-top:25px};"],
})

export class FlipComponent implements OnInit {
  deck: Deck;
  parentRouteId: number;
  private sub: any;
  private currentCard: Card;
  // private cardPrev: Card;
  // private cardNext: Card;
  private currentCardIndex: number = 0;
  // private isNext: boolean = false;
  // private isPrevious: boolean = false;
  // private tempNext: boolean = true;
  // private tempPrevious: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private location: Location,
  ) {}


  ngOnInit(): void {
    // get deck id from parent component
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
    });
    this.deckService.getDeck(this.parentRouteId).then(deck => this.deck = deck)
    .then(cards => this.currentCard = this.deck.cards[0]);
  }

  // listen for spacebar keyup
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if (ev.keyCode == 32) {
      this.flipCard();
      ev.preventDefault();
      
    }
    // listen for right arrow keyup
    else if (ev.keyCode == 39) {
      this.nextCard();
      this.nextTransition();
    }
    // listen for left arrow keyup
    else if (ev.keyCode == 37) {
      this.previousCard();
      this.prevTransition();
    }
  }

  hexToRGB(hex: string, alpha: number): string {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  // progress bar
  progress(): number {
    return (this.currentCardIndex+1)/this.deck.cards.length*100
  }
  
  // use jquery because it takes 1 line vs angular's stupid and convoluted methods
  flipCard(): void {
    $('.flashcard').toggleClass('flipped');
  }

  nextTransition(): void {
    // $('#next_button').click(function(){
      $('#prev_div').addClass('prev-left');
      $('#next_div').addClass('next-left');
      $('#cur_div').addClass('cur-reappear');
      $('#prev_div').on('webkitAnimationEnd', function(){
        $('#prev_div').removeClass('prev-left');
      });
      $('#next_div').on('webkitAnimationEnd', function(){
        $('#next_div').removeClass('next-left');
      });
      $('#cur_div').on('webkitAnimationEnd', function(){
        $('#cur_div').removeClass('cur-reappear');
      });
    // })
  }

  prevTransition(): void {
    // $('#prev_button').click(function(){
      $('#prev_div').addClass('prev-right');
      $('#next_div').addClass('next-right');
      $('#cur_div').addClass('cur-reappear');
      $('#prev_div').on('webkitAnimationEnd', function(){
        $('#prev_div').removeClass('prev-right');
      });
      $('#next_div').on('webkitAnimationEnd', function(){
        $('#next_div').removeClass('next-right');
      });
      $('#cur_div').on('webkitAnimationEnd', function(){
        $('#cur_div').removeClass('cur-reappear');
      });
    // })
  }

  //methods: previous card, next card
  nextCard(): void {
    this.currentCardIndex += 1;
    
    if (this.currentCardIndex == this.deck.cards.length) {
      this.currentCardIndex = 0;
    }
    this.currentCard = this.deck.cards[this.currentCardIndex];
    this.isNext = !this.isNext;
    this.isPrevious = false;
    // this.cardPrev = this.deck.cards[(this.currentCardIndex-1)%this.deck.cards.length];
    // this.cardNext = this.deck.cards[(this.currentCardIndex+1)%this.deck.cards.length];
  }

  previousCard(): void {
    this.currentCardIndex -= 1;
    if (this.currentCardIndex < 0) {
      this.currentCardIndex = this.deck.cards.length-1;
    }
    this.currentCard = this.deck.cards[this.currentCardIndex];
    this.isPrevious = !this.isPrevious;
    this.isNext = false;
    // this.cardPrev = this.deck.cards[(this.currentCardIndex-1)%this.deck.cards.length];
    // this.cardNext = this.deck.cards[(this.currentCardIndex+1)%this.deck.cards.length];
  }

  goBack(): void {
    this.location.back();
  }

  shuffleCards(): void {
    var i = 0, j = 0, temp = null;
    for (i = this.deck.cards.length - 1; i > 0; i -=1) {
      j = Math.floor(Math.random()*(i+1));
      temp = this.deck.cards[i];
      this.deck.cards[i] = this.deck.cards[j];
      this.deck.cards[j] = temp
    }
    this.currentCard = this.deck.cards[0]
  }
}
