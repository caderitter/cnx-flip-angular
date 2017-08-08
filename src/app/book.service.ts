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

  private booksUrl: string = 'https://openstax.org/api/v2/pages/?type=books.Book&fields=title,subject_name,cnx_id,cover_url,webview_link&limit=250';
  private bookTreeUrl: string = 'localhost:6543/xpath';
  private xpath: string = "//*[local-name()='definition']";

  constructor(private http: Http) {}

  getBookTree(uuid: string): Promise<string> {
    return this.http.get(this.bookTreeUrl)
      .toPromise()
      .then(res => res.toString())
  }

  getBookJSON(): Promise<any> {
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(res => res.json()['items'])
  }
}
