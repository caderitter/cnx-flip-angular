import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject, Subject} from "rxjs/Rx";
import {DeckService} from "./deck.service";

@Injectable()
export class BookService {

  deck: Deck;
  bookTree: any;

  private booksUrl: string = 'https://openstax.org/api/v2/pages/?type=books.Book&fields=title,subject_name,cnx_id,cover_url,webview_link,coming_soon&limit=250';
  private bookUrl: string = 'https://openstax.org/api/v2/pages/?type=books.Book&fields=title,subject_name,cnx_id,cover_url,webview_link,table_of_contents&limit=250&cnx_id=';
  private bookTreeUrl: string = 'http://localhost:6543/xpath';
  private xpath: string = "//*[local-name()='definition']";

  private headers = new Headers({'ACCEPT': 'application/xhtml+xml'});

  constructor(private http: Http) {}

  getBookTree(uuid: string): Promise<> {
    // FIXME - remove the hard-coded uuid
    uuid = 'e79ffde3-7fb4-4af3-9ec8-df648b391597';
    return this.http.get(this.bookTreeUrl + '?id=' + uuid + '&q=' + this.xpath, {headers: {'Accept': 'application/xhtml+xml'}})
      .toPromise()
      .then(res => res.text())
  }

  getBookJSON(uuid: string): Promise<> {
    return this.http.get(this.bookUrl + uuid)
      .toPromise()
      .then(res => res.json().items)
  }

  getBooksJSON(): Promise<> {
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(res => res.json().items)
  }
}
