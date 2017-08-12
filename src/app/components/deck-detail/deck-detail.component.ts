/**
 * Component to display a deck's detail - the dashboard for a deck.
 * Edit deck/delete deck, add/edit/remove cards, sync with book, study flashcards.
 */

import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Location} from "@angular/common";

import {DeckService} from "../../services/deck.service";
import {Deck} from "../../models/deck";
import 'rxjs/add/operator/switchMap';
import {CardContainerComponent} from "../card-container/card-container.component";
import {Observable, Subscription} from "rxjs/Rx";

@Component({
  selector: 'deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css',]
})

export class DeckDetailComponent implements OnInit {

  deck: Deck;

  // access deck delete button in the DOM
  @ViewChild('deleteButton') vcDeleteButton: any;

  // html/style variables
  addCardButtonClicked: boolean = false;
  editTitle: boolean = false;
  deleteButtonClicked: boolean = false;
  deleteText: string;
  deckNotFound: boolean = false;
  colors: string[] = ["#15837D", "#EF5F33", "#1B2152", "#1BB3D3", "#B30B26", "#FDB32F", "#F0C916", "#65A234", "#8f8f8f"];
  top: string = "-200px";
  topBelow: string = "-100px";
  deleteButtonStyle = "btn-default";

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    document.addEventListener('click', this.clickOutsideDeleteButton.bind(this));
    this.deleteText = 'Delete deck';
  }

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe((params: Params) => this.deckService.getDeck(params['id']));
  }

  goBack(): void {
    this.router.navigate(['decks']);
  }

  saveDeck(): void {
    this.deckService.updateDeck(this.deck);
    this.hideEditTitle();
  }

  deleteDeck(deck: Deck): void {
    this.deleteText = "Deleting...";
    this.deckService.deleteDeck(deck.id).then(res => this.router.navigate(['decks']));
  }

  // change delete button text if it's clicked ("Are you sure?")
  deleteDeckClicked(deck: Deck): void {
    if (this.deleteButtonClicked) {
      this.deleteDeck(deck);
      this.deleteButtonClicked = false;
    } else {
      this.deleteText = "Are you sure?";
      this.deleteButtonClicked = true;
    }
  }

  // Slides the card-form.component out when clicked
  toggleAddCardButton(): void {
    this.addCardButtonClicked = !this.addCardButtonClicked;
    if (this.top == "0") {
      this.top = "-200px";
      this.topBelow = "-100px";
    } else {
      this.top = "0";
      this.topBelow = "0";
    }
  }

  // checks if the user clicks away from the delete button after pressing once
  // to cancel
  clickOutsideDeleteButton(event: any) {
    if (!this.vcDeleteButton.nativeElement.contains(event.target)) {
      this.deleteButtonClicked = false;
      this.deleteText = "Delete deck";
    }
  }

  // focuses/unfocuses on the title form
  toggleEditTitle(): void {
    this.editTitle = !this.editTitle;
  }

  hideEditTitle(): void {
    this.editTitle = false;
    this.deckService.getDeck(this.deck.id);
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
