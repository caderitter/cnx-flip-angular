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

  loading: boolean;

  constructor(
    private bookService: BookService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    // retrieve the JSON of featured books for display
    this.bookService.getBooksJSON()
      .then(res => {
        this.loading = false;
        this.booksJSON = res;
      });

  }
}
