import {Injectable} from "@angular/core";
import {Deck} from "./deck";
import {Card} from "./card";

@Injectable()
export class LocalStorageService {
  public decks: Deck[];

  getDecks(): Deck[] {
    return this.getDecksJSON() as Deck[];
  }

  getDeck(id: number): Deck {
    try {
      return this.getDecks().find(deck => deck.id === id)
    } catch (e) {
      console.log('No such deck with id == %d', id);
    }
  }

  getDecksJSON(): any {
    let decks = localStorage.getItem('localDecks');
    if (!decks) {
      localStorage.setItem('localDecks', '');
    }
    return JSON.parse(decks);
  }

  createDeck(name: string): Deck {
    let decks = this.getDecksJSON();
    let ids = decks.decks.keys();
    let maxID = Math.max(ids);
    let deck = new Deck(maxID + 1, name, [], '#8f8f8f');
    decks[name] = deck;
    this.saveDecks(decks);
    return deck;
  }

  saveDecks(decks: Deck[]): void {
    localStorage.setItem('localDecks', JSON.stringify(decks))
  }

  addCardToDeck(id: number, card: Card): void {
    let decks = this.getDecksJSON();
    let deck = decks[id];
    deck.cards.push(card);
    decks[id] = deck;
    this.saveDecks(decks);
  }
}
