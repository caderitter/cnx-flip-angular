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

  // change font size depending on length of content. element is either 'term' or 'definition'.
  getFontSize(element: string): string {
    length = this.deck.cards[this.currentCardIndex][element].length;
    return StudyComponent.getFontSizeHelper(length, 10, 1, 3, 50, 300);
  }

  /**
   * Returns 'calc({number}px + {number}vw)' for use in a 'font-size' style attribute. This allows responsive and
   * dynamic text size based on the content length, also ensuring text doesn't get too small on small screens (a
   * common problem with view-width text size).
   *
   * @param contentLength
   * @param minPx - font pixel value to act a 'minimum.' Play with this to find the ideal size.
   * @param minVW - minimum VW value.
   * @param maxVW - maximum VW value.
   * @param minLength - minimum content length at which to stop scaling VW value.
   * @param maxLength - maximum content length at which to stop scaling VW value.
   */
  static getFontSizeHelper(contentLength: number, minPx: number, minVW: number,
                 maxVW: number, minLength: number, maxLength: number): string {
    var val;
    if (contentLength < minLength) {
      val = maxVW;
    } else if (contentLength > maxLength) {
      val = minVW;
    } else {
      let slope = (minVW - maxVW) / contentLength;
      let intercept = maxVW - (minLength * (slope));
      val = ((slope * contentLength) + intercept).toString();
    }
    return 'calc('+ minPx.toString() + 'px' + ' + ' + val + 'vw' + ')';
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
