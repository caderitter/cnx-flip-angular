/**
 * Component for displaying modules in a book to choose from.
 */

import {Component, OnInit, ViewChild} from "@angular/core";
import {Deck} from "../../models/deck";
import {DeckService} from "../../services/deck.service";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../services/book.service";
import {Module} from "../../models/module";
import {BookTreeComponent} from "../book-tree/book-tree.component";

@Component({
  selector: 'choose-module',
  templateUrl: `./choose-module.book-sync.component.html`
})

export class ChooseModuleComponent implements OnInit {
  @ViewChild(BookTreeComponent) bookTree: BookTreeComponent;

  deck: Deck;
  module: Module;

  constructor(
    private deckService: DeckService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // subscribe to the deck BehaviorSubject
    this.deckService.deck.subscribe(deck => this.deck = deck);

    this.route.params.subscribe((params: Params) => {
      // load the deck into the BehaviorSubject from the backend
      this.deckService.getDeck(params['id']);

      // and call our book tree generator with the UUID in the URL
      this.getBookTreeFromJSON(params['uuid']);
    });
  }

  // retrieves the book table of contents and calls the tree generator helper
  getBookTreeFromJSON(uuid: string): void {
    this.bookService.getBookJSON(uuid).then(data => {
      this.module = this.getBookTreeHelper(data[0].table_of_contents);
    })
  }

  // recursively constructs a tree of Module objects given a TOC json object
  getBookTreeHelper(obj: any): Module {
    var root = new Module(obj.title, obj.id, []);

    // if we have children...
    if (obj.contents) {

      // recursively call the helper to build the tree
      obj.contents.forEach(subobj => {
        var child = this.getBookTreeHelper(subobj);
        child.appendParent(root);
        root.appendChild(child);
      })
    }
    return root
  }

  // get the selected module UUIDs and call the backend to generate cards
  sync(): void {
    let uuidArray = this.bookTree.getValue();
    this.deckService.syncWithBook(this.deck.id, uuidArray);
    this.router.navigate(['deck-detail', this.deck.id]);
  }
}
