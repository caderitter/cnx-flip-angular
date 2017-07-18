import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Card} from "./card";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const cards: Card[] = [
      {id: 1, term: 'philosophical empiricism', definition: 'all concepts come from experience, all rational beliefs are justifiable through experience' },
      {id: 2,  term: 'functionalism', definition: 'approach to psych that considers mental life in terms of adaptation to the person\'s environment' },
      {id: 3,  term: 'hysteria', definition: 'loss of cog/motor functions as result of upsetting experience' },
      {id: 4,  term: 'predictive validity', definition: 'predicts other measures of trait in question (related traits); high school GPA predicts college GPA' },
      {id: 5,  term: 'APA code of ethics', definition: 'informed consent, freedom from coercion, protection from harm, risk-benefit analysis, debriefing' },
    ];

    const decks = [
      { id: 1, name: "Psychology Ch. 1", cards: cards, color: '#1B2152'},
      { id: 2, name: "Biology Ch. 4", cards: cards, color: '#65A234'},
      { id: 3, name: "Econ Ch. 3", cards: cards, color: '#F0C916'},
    ];

    return {decks, cards};
  }
}
