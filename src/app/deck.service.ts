// service to get decks - currently plugged to mock service

import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {
  private decks: Deck[];

  // TODO - plug into pyramid
  private decksUrl = 'api/decks';
  private headers = new Headers({'Content-Type': 'application/json'});

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

  getDeck(id: number): Promise<Deck> {
    const url = `${this.decksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Deck)
      .catch(this.handleError);
  }

  updateDeck(deck: Deck): Promise<Deck> {
    const url = `${this.decksUrl}/${deck.id}`;
    return this.http
      .put(url, JSON.stringify(deck), {headers: this.headers})
      .toPromise()
      .then(() => deck)
      .catch(this.handleError);
  }

  createDeck(name: string): Promise<Deck> {
    return this.http
      .post(this.decksUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Deck)
      .catch(this.handleError);
  }

  deleteDeck(id: number): Promise<void> {
    const url = `${this.decksUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
