import {Component, OnInit} from "@angular/core";
import {Deck} from "../../models/deck";
import {DeckService} from "../../services/deck.service";
import {Params, ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'choose-book',
  templateUrl: `./choose-book.book-sync.component.html`
})

export class ChooseBookComponent implements OnInit {
  deck: Deck;
  booksJSON: any;


  constructor(
    private deckService: DeckService,
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe((params: Params) => this.deckService.getDeck(params['id']));
    this.bookService.getBooksJSON().then(res => this.booksJSON = res);
  }
}
