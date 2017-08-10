/**
 * Reactive service which keeps track of a deck in the form of a BehaviorSubject.
 */

import {Injectable} from '@angular/core';

import {Deck} from '../models/deck';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Card} from "../models/card";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class DeckService {

  // a BehaviorSubject is a type of Observable that stores a value. When we update
  // the deck, all of this deck's subscribers (components) receive an event and
  // update their copy of the deck.
  deck: BehaviorSubject<Deck>;

  private decksUrl = 'http://localhost:5000/api/decks/1';
  private cardsUrl = 'http://localhost:5000/api/cards/1';
  private textbookUrl = 'http://localhost:5000/api/textbook';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.deck = new BehaviorSubject<Deck>(null);
  }

  /*
  DECK METHODS
   */

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
  CARD METHODS
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

  syncWithBook(id: number, ids: string[]): void {
    let json = {deckid: id, uuids: ids};
    this.http.post(`${this.textbookUrl}/`, json)
      .map(res => res.json())
      .subscribe(deck => {
        this.deck.next(deck);
      }, error => console.log("Error getting terms from book"));
  }

}
