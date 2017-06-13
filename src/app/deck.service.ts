// service to get decks - currently plugged to mock service

import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {
  private decks: Deck[];
  private decksUrl = 'api/decks';

  constructor(private http: Http) {}


  getDecks(): Promise<Deck[]> {
    return this.http.get(this.decksUrl)
      .toPromise()
      .then(response => response.json().data as Deck[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // TODO - plug into pyramid
  getDeck(id: number): Promise<Deck> {
    const url = `${this.decksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Deck)
      .catch(this.handleError);
  }
}
