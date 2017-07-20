// service to get decks

import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Card} from "./card";

@Injectable()
export class DeckService {

  // TODO - plug into pyramid
  private decksUrl = 'api/decks';
  private cardsUrl = 'api/cards';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getDecks(): Promise<Deck[]> {
    return this.http.get(this.decksUrl)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json().data as Deck[];
      })
      .catch(DeckService.handleError);
  }

  getDeck(id: number): Promise<Deck> {
    const url = `${this.decksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Deck)
      .catch(DeckService.handleError);
  }

  updateDeck(deck: Deck): Promise<Deck> {
    const url = `${this.decksUrl}/${deck.id}`;
    return this.http
      .put(url, JSON.stringify(deck), {headers: this.headers})
      .toPromise()
      .then(() => deck)
      .catch(DeckService.handleError);
  }

  createDeck(name: string): Promise<Deck> {
    return this.http
      .post(this.decksUrl, JSON.stringify({name: name, cards: [], color: '#8f8f8f'}), {headers: this.headers})
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
  In the backend, cards are unique to each deck. When we create a card, we need to pass the deck ID so the backend can
  know which deck the new card belongs to. For updating and deleting, however, we only need to pass the card, because
  the backend knows which card IDs belong to which decks.
   */

  createCard(deck: Deck, term: string, def: string): Promise<Deck> {
    return this.http
      .post(this.cardsUrl, JSON.stringify({deckid: deck.id, term: term, def: def}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Deck)
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
