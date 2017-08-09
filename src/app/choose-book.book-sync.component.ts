import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";
import {Params, ActivatedRoute} from "@angular/router";
import {BookService} from "./book.service";

@Component({
  selector: 'choose-book',
  templateUrl: `./static/choose-book.book-sync.component.html`
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
