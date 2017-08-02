// service to get decks

import {Injectable} from '@angular/core';

import {Deck} from './deck';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Card} from "./card";
import {Subject, Observable, BehaviorSubject} from "rxjs";
// import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class DeckService {

  private decksBehaviorSubject: BehaviorSubject<Deck[]>;
  public decksObservable: Observable<Deck[]>;
  private decks: Deck[];

  private decksUrl = 'https://5981fb85139db000114a2dea.mockapi.io/api/decks'; //'http://localhost:5000/api/getDecks';
  private deckUrl = 'https://5981fb85139db000114a2dea.mockapi.io/api/decks'; //'http://localhost:5000/api/getDeck';
  private decksApiUrl = 'http://localhost:5000/api/decks';
  private cardsUrl = 'http://localhost:5000/api/cards';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.decks = [];
    this.decksBehaviorSubject = new BehaviorSubject<Deck[]>([]);
    this.decksObservable = this.decksBehaviorSubject.asObservable();
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  loadDecks(): void {
    this.http.get(this.decksUrl)
      .map(response => response.json())
      .subscribe(decks => {
        this.decks = decks;
        this.decksBehaviorSubject.next(this.decks);
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
        this.decksBehaviorSubject.next(this.decks);
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
      }, error => console.log("Error updating deck"));
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
      }, error => "Error deleting deck");
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
