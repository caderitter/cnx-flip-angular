// service to get decks

import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Card} from "./card";
// import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class DeckService {

  // TODO - plug into pyramid

  //Have to add http
  private decksUrl = 'http://localhost:5000/api/getDecks';
  private deckUrl = 'http://localhost:5000/api/getDeck';
  private decksApiUrl = 'http://localhost:5000/api/decks'
  private cardsUrl = 'http://localhost:5000/api/cards';
  private headers = new Headers({'Content-Type': 'application/json'});
  // private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: Http) {}

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getDecks(): Promise<Deck[]> {
    return this.http.get(this.decksUrl)
      .toPromise()
      .then(response => {
        console.log('get here');
        console.log(response.json());
        return response.json() as Deck[];
      })
      .then(the_deck => {console.log(the_deck); 
        return the_deck;})
      .catch(DeckService.handleError);
  }

  getDeck(id: number): Promise<Deck> {
    const url = `${this.deckUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response)
        return response.json() as Deck;
      })
      .catch(DeckService.handleError);
  }

  updateDeck(deck: Deck): Promise<Deck> {
    const url = `${this.deckUrl}/${deck.id}`;
    return this.http
      .put(url, JSON.stringify(deck), {headers: this.headers})
      .toPromise()
      .then(() => deck)
      .catch(DeckService.handleError);
  }

  createDeck(name: string): Promise<Deck> {
    return this.http
      .post(this.decksUrl, JSON.stringify({title: name, cards: [], color: '#8f8f8f'}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Deck)
      .catch(DeckService.handleError);
  }

  deleteDeck(id: number): Promise<void> {
    const url = `${this.decksUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(DeckService.handleError);
  }

  /*
  The below methods are for creating, updating, and deleting cards. Each returns a new deck with the updated card state.
   */

  createCard(id: number, term: string, def: string): Promise<Deck> {
    return this.http
      .post(this.cardsUrl, JSON.stringify({deckid: id, term: term, definition: def}), {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res);
        return res.json().data as Deck;
      })
      .catch(DeckService.handleError);
  }

  updateCard(deck: Deck, card: Card): Promise<Deck> {
    const url = `${this.cardsUrl}/${card.id}`;
    return this.http
      .put(url, JSON.stringify(card), {headers: this.headers})
      .toPromise()
      .then(() => deck)
      .catch(DeckService.handleError);
  }

  deleteCard(deck: Deck, card: Card): Promise<Deck> {
    const url = `${this.cardsUrl}/${card.id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => deck)
      .catch(DeckService.handleError);
  }
}
