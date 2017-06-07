// service to get decks - currently plugged to mock service

import { Injectable } from '@angular/core';

import { Deck } from './deck';
import { DECKS } from './mock-decks';

@Injectable()
export class DeckService {
  private decks;

  getDecks(): Deck[] {
    return DECKS;
  }

  getDeck(id: number): Deck {
    this.decks = this.getDecks();
    return this.decks.find(deck => deck.id === id);
  }
}
