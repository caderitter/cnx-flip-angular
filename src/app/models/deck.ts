// definition for deck

import {Card} from "./card";

export class Deck {

  constructor(
    public id: number,
    public title: string,
    public cards: Card[],
    public color: string,
  ) {}

}
