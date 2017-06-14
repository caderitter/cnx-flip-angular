import {InMemoryDbService} from 'angular-in-memory-web-api';
import {CARDS} from "./mock-cards";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const decks = [
      { id: 1, name: "Test Deck 1", cards: CARDS},
      { id: 2, name: "Test Deck 2", cards: CARDS},
      { id: 3, name: "Test Deck 3", cards: CARDS},
      { id: 4, name: "Test Deck 4", cards: CARDS},
    ];

    return {decks};
  }
}
