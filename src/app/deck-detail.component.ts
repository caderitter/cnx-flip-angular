// component to display deck detail

import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "./deck.service";
import {Deck} from "./deck";
import 'rxjs/add/operator/switchMap';
import {Card} from "./card";


@Component({
  selector: 'deck-detail',
  templateUrl: './static/deck-detail.component.html',
})

export class DeckDetailComponent implements OnInit, OnDestroy {
  deck: Deck;
  @ViewChild('titlefocusable') vc: any;
  @ViewChild('deleteButton') vcDeleteButton: any;

  // html/style variables
  addCardButtonClicked: boolean = false;
  editTitle: boolean = false;
  deleteButtonClicked: boolean = false;
  deleteText: string = "Delete deck";
  deckNotFound: boolean = false;
  colors: string[] = ["#15837D", "#EF5F33", "#1B2152", "#1BB3D3", "#B30B26", "#FDB32F", "#F0C916", "#65A234", "#8f8f8f"];
  top: string = "-200px";
  topBelow: string = "-180px";
  deleteButtonStyle = "btn-default";

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    document.addEventListener('click', this.clickOutsideDeleteButton.bind(this));
  }

  // TODO - add authentication if/else

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.deckService.getDeck(+params['id']))
      .subscribe(deck => this.deck = deck, error => this.deckNotFound = true);
  }

  ngOnDestroy(): void {
    this.deckNotFound = false;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.deckService.updateDeck(this.deck)
      .then(deck => this.deck = deck);
    this.hideEditTitle();
  }

  deleteDeck(deck: Deck): void {
    this.deckService.deleteDeck(deck.id);
    this.goBack();
  }

  deleteDeckClicked(deck: Deck): void {
    if (this.deleteButtonClicked) {
      this.deleteDeck(deck);
      this.deleteText = "Delete deck";
      this.deleteButtonClicked = false;
    } else {
      this.deleteText = "Are you sure?";
      this.deleteButtonClicked = true;
    }
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

  clickOutsideDeleteButton(event:any) {
    if (!this.vcDeleteButton.nativeElement.contains(event.target)) {
      this.deleteButtonClicked = false;
      this.deleteText = "Delete deck";
    }
  }

  toggleEditTitle(): void {
    this.editTitle = !this.editTitle;
    this.vc.nativeElement.focus();
  }

  hideEditTitle(): void {
    this.editTitle = false;
  }

  changeDeckColor(color: string): void {
    this.deck.color = color;
    this.deckService.updateDeck(this.deck);
  }

  hexToRGB(hex: string, alpha: number): string {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";

  }
}
