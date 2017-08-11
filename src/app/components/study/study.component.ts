import {Component, OnInit} from '@angular/core';
import {DeckService} from '../../services/deck.service';
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../../models/deck";

@Component({
  selector: 'study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})

export class StudyComponent implements OnInit {

  deck: Deck;
  currentCardIndex: number;
  textSize: number;
  cardFlipped: boolean = false;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe(params => this.deckService.getDeck(params['id']));
  }

  flipCard(): void {
    this.cardFlipped = !this.cardFlipped;
  }


}
