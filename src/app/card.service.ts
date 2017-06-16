// service to get decks - currently plugged to mock service

import {Injectable} from '@angular/core';

import {Card} from './card';
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardService {
  private cards: Card[];

  // TODO - plug into pyramid
  private cardsUrl = 'api/cards';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getCards(): Promise<Card[]> {
    return this.http.get(this.cardsUrl)
      .toPromise()
      .then(response => response.json().data as Card[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getCard(id: number): Promise<Card> {
    const url = `${this.cardsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Card)
      .catch(this.handleError);
  }

  updateCard(card: Card): Promise<Card> {
    const url = `${this.cardsUrl}/${card.id}`;
    return this.http
      .put(url, JSON.stringify(card), {headers: this.headers})
      .toPromise()
      .then(() => card)
      .catch(this.handleError);
  }

  createCard(term: string, def: string): Promise<Card> {
    return this.http
      .post(this.cardsUrl, JSON.stringify({term: term, def: def}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Card)
      .catch(this.handleError);
  }

  deleteCard(id: number): Promise<void> {
    const url = `${this.cardsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
