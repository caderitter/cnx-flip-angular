import {InMemoryDbService} from 'angular-in-memory-web-api';
import {CARDS} from "./mock-cards";
import {Card} from "./card";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const decks = [
      { id: 1, name: "Test Deck 1", cards: CARDS, color: '#5f5f5f'},
      { id: 2, name: "Test Deck 2", cards: CARDS, color: '#5f5f5f'},
      { id: 3, name: "Test Deck 3", cards: CARDS, color: '#5f5f5f'},
      { id: 4, name: "Test Deck 4", cards: CARDS, color: '#5f5f5f'},
      { id: 5, name: "Test Deck 5", cards: CARDS, color: '#5f5f5f'},
    ];

    const cards: Card[] = [
      { id: 1, term: 'Test term 1', definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci nisl, sagittis ac tincidunt lacinia, sodales ac nibh. Fusce venenatis eleifend tortor, nec placerat eros laoreet sit amet. Quisque rhoncus non diam eu elementum. Praesent pulvinar nisi a urna lobortis auctor sit amet sed est. Aliquam eget orci sapien. Vestibulum.' },
      { id: 2, term: 'Test term 2', definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci nisl, sagittis ac tincidunt lacinia, sodales ac nibh. Fusce venenatis eleifend tortor, nec placerat eros laoreet sit amet. Quisque rhoncus non diam eu elementum. Praesent pulvinar nisi a urna lobortis auctor sit amet sed est. Aliquam eget orci sapien. Vestibulum.' },
      { id: 3, term: 'Test term 3', definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci nisl, sagittis ac tincidunt lacinia, sodales ac nibh. Fusce venenatis eleifend tortor, nec placerat eros laoreet sit amet. Quisque rhoncus non diam eu elementum. Praesent pulvinar nisi a urna lobortis auctor sit amet sed est. Aliquam eget orci sapien. Vestibulum.' },
      { id: 4, term: 'Test term 4', definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci nisl, sagittis ac tincidunt lacinia, sodales ac nibh. Fusce venenatis eleifend tortor, nec placerat eros laoreet sit amet. Quisque rhoncus non diam eu elementum. Praesent pulvinar nisi a urna lobortis auctor sit amet sed est. Aliquam eget orci sapien. Vestibulum.' },
      { id: 5, term: 'Test term 5', definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci nisl, sagittis ac tincidunt lacinia, sodales ac nibh. Fusce venenatis eleifend tortor, nec placerat eros laoreet sit amet. Quisque rhoncus non diam eu elementum. Praesent pulvinar nisi a urna lobortis auctor sit amet sed est. Aliquam eget orci sapien. Vestibulum.' },
    ];

    return {decks, cards};
  }
}
