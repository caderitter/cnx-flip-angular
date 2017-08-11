/**
 * Component for displaying a list of featured books to choose from.
 */

import {Component, OnInit} from "@angular/core";
import {Deck} from "../../models/deck";
import {DeckService} from "../../services/deck.service";
import {Params, ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'choose-book',
  templateUrl: `./choose-book.book-sync.component.html`,
  styleUrls: ['./choose-book.book-sync.component.css',]
})

export class ChooseBookComponent implements OnInit {
  deck: Deck;
  booksJSON: any;

  constructor(
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    // retrieve the JSON of featured books for display
    this.bookService.getBooksJSON()
      .then(res => this.booksJSON = res);
  }
}
