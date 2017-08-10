import {Component, OnInit, ViewChild} from "@angular/core";
import {Deck} from "../../models/deck";
import {DeckService} from "../../services/deck.service";
import {Params, ActivatedRoute} from "@angular/router";
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
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe((params: Params) => {
      this.deckService.getDeck(params['id']);
      this.getBookTreeFromJSON(params['uuid']);
    });
  }

  getBookTreeFromJSON(uuid: string): void {
    this.bookService.getBookJSON(uuid).then(data => {
      this.module = this.getBookTreeHelper(data[0].table_of_contents);
    })
  }

  getBookTreeHelper(obj: any): Module {
    var root = new Module(obj.title, obj.id, []);

    if (obj.contents) {
      obj.contents.forEach(subobj => {
        var child = this.getBookTreeHelper(subobj);
        child.appendParent(root);
        root.appendChild(child);
      })
    }
    return root
  }

  sync(): void {
    let uuidArray = this.bookTree.getValue();
    console.log(uuidArray);
  }
}
