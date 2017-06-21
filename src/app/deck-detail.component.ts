// component to display deck detail

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import 'rxjs/add/operator/switchMap';
import {trigger, state, style, animate, transition} from '@angular/animations';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'deck-detail',
  templateUrl: './static/deck-detail.component.html',
})

export class DeckDetailComponent implements OnInit {
  deck: Deck;
  addCardButtonClicked: boolean = false;
  editTitle: boolean = false;
  colors: string[] = ["#15837D", "#EF5F33", "#1B2152", "#1BB3D3", "#B30B26", "#FDB32F", "#F0C916", "#65A234", "#8f8f8f"];
  top: string;
  topBelow: string;


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

  save(): void {
    this.deckService.updateDeck(this.deck);
    this.hideEditTitle();
  }

  deleteDeck(deck: Deck): void {
    this.deckService.deleteDeck(deck.id);
    this.goBack();
  }

  toggleAddCardButton(): void {
    this.addCardButtonClicked = !this.addCardButtonClicked;
    if (this.top == "0") {
      this.top = "-200px";
      this.topBelow = "-180px";
    } else {
      this.top = "0";
      this.topBelow = "0";
    }
  }

  toggleEditTitle(): void {
    this.editTitle = !this.editTitle;
  }

  hideEditTitle(): void {
    this.editTitle = false;
  }

  changeDeckColor(color: string): void {
    this.deck.color = color;
    this.deckService.updateDeck(this.deck);
  }
}
