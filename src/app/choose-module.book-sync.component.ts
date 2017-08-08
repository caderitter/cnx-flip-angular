import {Component, OnInit} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";
import {Params, ActivatedRoute} from "@angular/router";
import {BookService} from "./book.service";

@Component({
  selector: 'choose-module',
  templateUrl: `./static/choose-module.book-sync.component.html`
})

export class ChooseModuleComponent implements OnInit {

  deck: Deck;
  bookUUID: string;
  bookTreeHTML: string;

  constructor(
    private deckService: DeckService,
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe((params: Params) => this.deckService.getDeck(params['id']));
    this.route.params.subscribe((params: Params) => this.bookUUID = params['uuid']);
  }
}
