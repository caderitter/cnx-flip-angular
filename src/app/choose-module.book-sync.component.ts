import {Component, OnInit, ViewChild, ElementRef, Renderer2} from "@angular/core";
import {Deck} from "./deck";
import {DeckService} from "./deck.service";
import {Params, ActivatedRoute} from "@angular/router";
import {BookService} from "./book.service";

@Component({
  selector: 'choose-module',
  templateUrl: `./static/choose-module.book-sync.component.html`
})

export class ChooseModuleComponent implements OnInit {

  @ViewChild('HTMLtree') HTMLtree: ElementRef;

  bookJSON: any;
  deck: Deck;

  constructor(
    private deckService: DeckService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.deckService.deck.subscribe(deck => this.deck = deck);
    this.route.params.subscribe((params: Params) => {
      this.deckService.getDeck(params['id']);
      // this.bookService.getBookTree(params['uuid']).then(tree => {
      //   this.HTMLtree.nativeElement.innerHTML = tree;
      this.bookService.getBookJSON(params['uuid']).then(book => {
        this.bookJSON = book;
      })
    });
  }

  getBookTreeFromJSON(uuid: string): any {
    let bookJSON: any;
    // TODO wrap output in ul
  }

  getBookTreeHelper(obj: any): any {
    // create
    var root = this.renderer.createElement('li');
    var ref = this.renderer.createElement('a');
    var title = this.renderer.createText(obj.title);
    this.renderer.appendChild(ref, title);
    this.renderer.appendChild(root, ref);

    if (obj.id != 'subcol') {
      this.renderer.setAttribute(ref, 'href', this.deckService.cardsUrl + '/' + obj.id);
    }

    this.renderer.appendChild(root, ref);

    if (obj.contents) {
      obj.contents.forEach(subobj => {
        var ul = this.renderer.createElement('ul');
        var rec = this.getBookTreeHelper(subobj);
        this.renderer.appendChild(ul, rec)
      });
    }
    return root;
  }
}
