import {Component, OnInit} from '@angular/core';
import {DeckService} from '../../services/deck.service';
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../../models/deck";
import {Location} from "@angular/common";

@Component({
  selector: 'study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})

export class StudyComponent implements OnInit {

  deck: Deck;
  currentCardIndex: number = 0;
  cardFlipped: boolean = false;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe(params => this.deckService.getDeck(params['id']));
  }

  goBack(): void {
    this.location.back();
  }

  flipCard(): void {
    this.cardFlipped = !this.cardFlipped;
  }

  // change font size depending on length of content
  getFontSize(element: string): string {
    length = this.deck.cards[this.currentCardIndex][element].length;
    console.log(length);
    let ret = '4';
    if (length < 15) {
      ret = '4';
    } else if (length > 100) {
      ret = '2';
    } else {
      ret = (this.deck.cards[this.currentCardIndex][element].length / -50 + 4).toString();
    }
    return ret + 'vw';
  }

  nextCard(): void {
    if (this.currentCardIndex == this.deck.cards.length - 1) {
      this.currentCardIndex = 0;
    } else {
      this.currentCardIndex++;
    }
    this.cardFlipped = false;
  }

  prevCard(): void {
    if (this.currentCardIndex == 0) {
      this.currentCardIndex = this.deck.cards.length - 1;
    } else {
      this.currentCardIndex--;
    }
    this.cardFlipped = false;

  }

  getProgress(): string {
    return (((this.currentCardIndex + 1)/this.deck.cards.length) * 100).toString();
  }

}
