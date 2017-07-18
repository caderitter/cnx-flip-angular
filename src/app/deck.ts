// definition for deck

import {Card} from "./card";

export class Deck {

  constructor(
    public id: number,
    public name: string,
    public cards: number[],
    public color: string,
  ) {}

}
