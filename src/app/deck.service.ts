// service to get decks

import {Injectable, Input} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Card} from "./card";
import {Observable, BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class DeckService {

  private decksBehaviorSubject: BehaviorSubject<Deck[]>;
  public decksObservable: Observable<Deck[]>;
  private decks: Deck[];

  private decksUrl = 'http://localhost:5000/api/getDecks';
  private deckUrl = 'http://localhost:5000/api/getDeck';
  private cardsUrl = 'http://localhost:5000/api/cards';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.decks = [];
    this.decksBehaviorSubject = new BehaviorSubject<Deck[]>([]);
    this.decksObservable = this.decksBehaviorSubject.asObservable();
  }

  loadDecks(): void {
    this.http.get(this.decksUrl)
      .map(response => response.json())
      .subscribe(decks => {
        this.decks = decks;
        this.decksBehaviorSubject.next(Object.assign([], this.decks));
      }, error => console.log("Error retrieving decks"));
  }

  loadDeck(id: number): void {
    this.http.get(`${this.decksUrl}/${id}`)
      .map(response => response.json())
      .subscribe(deck => {
        let notFound = true;
        this.decks.forEach((item, idx) => {
          if (item.id === deck.id) {
            this.decks[idx] = deck;
            notFound = false;
          }
        });
        if (notFound = true) {
          this.decks.push(deck);
        }
        this.decksBehaviorSubject.next(Object.assign({}, this.decks));
      }, error => console.log("Error retrieving deck with id = %d", id))
  }

  createDeck(): number {
    let newDeckID = -1;
    this.http.post(this.decksUrl, {headers: this.headers})
      .map(response => response.json())
      .subscribe(deck => {
        this.decks.push(deck);
        this.decksBehaviorSubject.next(this.decks);
        newDeckID = deck.id;
      }, error => console.log("Error creating deck"));
    return newDeckID;
  }

  updateDeck(deck: Deck): void {
    this.http.put(`${this.deckUrl}/${deck.id}`, JSON.stringify(deck), {headers: this.headers})
      .map(response => response.json())
      .subscribe(deck => {
        this.decks.forEach((item ,idx) => {
          if (item.id === deck.id) {
            this.decks[idx] = deck;
          }
        });
        this.decksBehaviorSubject.next(this.decks);
      }, error => console.log("Error updating deck with id = %d", deck.id));
  }

  deleteDeck(id: number): void {
    this.http.delete(`${this.deckUrl}/${id}`, {headers: this.headers})
      .subscribe(response => {
        this.decks.forEach((item, idx) => {
          if (item.id === id) {
            this.decks.splice(idx, 1);
          }
        });
        this.decksBehaviorSubject.next(this.decks);
      }, error => console.log("Error deleting deck with id = %d", id));
  }

  /*
  The below methods are for creating, updating, and deleting cards. Each returns a new deck with the updated card state.
   */

  createCard(id: number, term: string, def: string): void {
    this.http.post(this.decksUrl, JSON.stringify({deckid: id, term: term, definition: def}), {headers: this.headers})
      .map(response => response.json())
      .subscribe(deck => {
        this.decks.push(deck);
        this.decksBehaviorSubject.next(this.decks);
      }, error => console.log("Error creating card in deck %d", id));
  }

  updateCard(card: Card): void {
    this.http.put(`${this.cardsUrl}/${card.id}`, JSON.stringify(card), {headers: this.headers})
      .map(response => response.json())
      .subscribe(deck => {
        this.decks.forEach((item ,idx) => {
          if (item.id === deck.id) {
            this.decks[idx] = deck;
          }
        });
        this.decksBehaviorSubject.next(this.decks);
      }, error => console.log("Error updating card with id = %d", card.id));
  }

  deleteCard(card: Card): void {
    this.http.delete(`${this.cardsUrl}/${card.id}`, {headers: this.headers})
      .subscribe(response => {
        this.decks.forEach((item, idx) => {
          if (item.id === card.id) {
            this.decks.splice(idx, 1);
          }
        });
        this.decksBehaviorSubject.next(this.decks);
      }, error => console.log("Error deleting card with id = %d", card.id));
  }
}
