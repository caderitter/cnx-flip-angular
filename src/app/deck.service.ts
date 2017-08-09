// service to get decks

import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Card} from "./card";
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";

@Injectable()
export class DeckService {

  deck: BehaviorSubject<Deck>;

  private decksUrl = 'http://localhost:5000/api/decks/1';
  cardsUrl = 'http://localhost:5000/api/cards/1';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.deck = new BehaviorSubject<Deck>(null);
  }

  getDecks(): Promise<Deck[]> {
    return this.http.get(this.decksUrl + '/')
      .toPromise()
      .then(res => res.json() as Deck[])
      .catch(err => Promise.reject(console.log("Error retrieving decks") || err));
  }

  getDeck(id: number): void {
    this.http.get(`${this.decksUrl}/${id}`)
      .map(res => res.json() as Deck)
      .subscribe(deck => this.deck.next(deck), error => console.log("Error retrieving deck"))
  }

  createDeck(): Promise<Deck> {
    return this.http.post(this.decksUrl + '/', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Deck)
      .catch(err => Promise.reject(console.log("Error creating deck")) || err);
  }

  updateDeck(deck: Deck): void {
    this.http.put(`${this.decksUrl}/${deck.id}`, JSON.stringify(deck), {headers: this.headers})
      .map(res => res.json() as Deck)
      .subscribe(deck => {
        this.deck.next(deck)
      }, error => console.log("Error updating deck"));
  }

  deleteDeck(id: number): void {
    this.http.delete(`${this.decksUrl}/${id}`, {headers: this.headers})
      .subscribe(() => this.deck.next(null), error => console.log("Error deleting deck"));
  }

  /*
  The below methods are for creating, updating, and deleting cards. Each returns a new deck with the updated card state.
   */

  createCard(id: number, term: string, def: string): void {
    this.http.post(this.cardsUrl + '/', JSON.stringify({deckid: id, term: term, definition: def}), {headers: this.headers})
      .map(res => res.json() as Deck)
      .subscribe(deck => {
        this.deck.next(deck);
      }, error => console.log("Error creating card"));
  }

  updateCard(card: Card): void {
    this.http.put(`${this.cardsUrl}/${card.id}`, JSON.stringify(card), {headers: this.headers})
      .map(res => res.json())
      .subscribe(deck => {
        this.deck.next(deck)
      }, error => console.log("Error updating card"));
  }

  deleteCard(card: Card): void {
    this.http.delete(`${this.cardsUrl}/${card.id}`, {headers: this.headers})
      .map(res => res.json())
      .subscribe(deck => {
        this.deck.next(deck);
      }, error => console.log("Error deleting card"));
  }
}
