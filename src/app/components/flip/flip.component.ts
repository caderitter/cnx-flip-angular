/**
 * Component to study flashcards.
 */

import {Component, Input, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import {DeckService} from "../../services/deck.service";
import {Deck} from "../../models/deck";
import {Card} from "../../models/card";
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Rx";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.css'],
})


export class FlipComponent implements OnInit {
  deck: Deck;

  private currentCard: Card;
  private currentCardIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe((params: Params) => this.deckService.getDeck(params['id']));
  }

  // listen for spacebar keyup
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if (ev.keyCode == 32) {
      ev.preventDefault();
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

  hexToRGB(hex: string, alpha: number): string {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  // progress bar
  progressPercentage(): number {
    return (this.currentCardIndex+1)/this.deck.cards.length*100
  }

  progressFraction(): string {
    if (this.currentCardIndex < this.deck.cards.length) {
      return String(this.currentCardIndex+1)+ '/' + String(this.deck.cards.length);
    }
    else {
      return String(this.deck.cards.length) + '/' + String(this.deck.cards.length);
    }
  }

  // use jquery because it takes 1 line vs angular's stupid and convoluted methods
  flipCard(): void {
    $('.flashcard').toggleClass('flipped');
  }

  // animation for transitioning to the next card 
  nextTransition(): void {
      $('#prev_div').addClass('prev-left');
      $('#next_div').addClass('next-left');
      $('#cur_div').addClass('cur-reappear');
      $('.flashcard').removeClass('flipped');  // prevent definition from flashing
      $('#prev_div').on('webkitAnimationEnd', function(){
        $('#prev_div').removeClass('prev-left');
      });
      $('#next_div').on('webkitAnimationEnd', function(){
        $('#next_div').removeClass('next-left');
      });
      $('#cur_div').on('webkitAnimationEnd', function(){
        $('#cur_div').removeClass('cur-reappear');
      });
  }

  // animation for transitioning to the previous card 
  prevTransition(): void {
      $('#prev_div').addClass('prev-right');
      $('#next_div').addClass('next-right');
      $('#cur_div').addClass('cur-reappear');
      $('.flashcard').removeClass('flipped');
      $('#prev_div').on('webkitAnimationEnd', function(){
        $('#prev_div').removeClass('prev-right');
      });
      $('#next_div').on('webkitAnimationEnd', function(){
        $('#next_div').removeClass('next-right');
      });
      $('#cur_div').on('webkitAnimationEnd', function(){
        $('#cur_div').removeClass('cur-reappear');
      });
  }

  flashOnce(): void {
    $('#cur_div').addClass('cur-reappear');
  }

  nextCard(): void {
    this.nextTransition();
    if (this.currentCardIndex+1 >= this.deck.cards.length) {
      $('.card_space').hide(); // hide card_space div
      $('#end-page').show();  // show end page
      $('#next_button').addClass('disabled');
      this.currentCardIndex = this.deck.cards.length;
    }
    else if (this.currentCardIndex == 0) {
      $('#prev_button').removeClass('disabled');
      this.currentCardIndex += 1;
    }
    else {
      this.currentCardIndex += 1;
    }

    if (this.currentCardIndex+1 <= this.deck.cards.length){
      this.currentCard = this.deck.cards[this.currentCardIndex];
    }
    
  }

  previousCard(): void {  
    if (this.currentCardIndex == 0) {
      $('#prev_button').addClass('disabled'); 
    }
    else {
      this.prevTransition();
      if (this.currentCardIndex == 1) {
        $('#prev_button').addClass('disabled'); 
        this.currentCardIndex -= 1;
      }
      else if (this.currentCardIndex == this.deck.cards.length) {
        $('.card_space').show();
        $('#end-page').hide();
        $('#next_button').removeClass('disabled');
        // this.currentCardIndex = this.deck.cards.length - 1;
        this.currentCardIndex -= 1;
      }
      else {
        this.currentCardIndex -= 1;
      }
    }
    this.currentCard = this.deck.cards[this.currentCardIndex];
  }

  // go back to deck page 
  goBack(): void {
    this.location.back();
  }

  shuffleCards(): void {
    var i = 0, j = 0, temp = null;
    for (i = this.deck.cards.length - 1; i > 0; i -=1) {
      j = Math.floor(Math.random()*(i+1));
      temp = this.deck.cards[i];
      this.deck.cards[i] = this.deck.cards[j];
      this.deck.cards[j] = temp;
    }
    this.currentCard = this.deck.cards[0];
  }
  
  startOver(): void {
    this.currentCardIndex = 0;
    this.currentCard = this.deck.cards[0];
    $('#end-page').hide();
    $('.card_space').show();
    $('#prev_button').addClass('disabled');
    $('#next_button').removeClass('disabled');
  }
}
