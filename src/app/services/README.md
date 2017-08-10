# Deck Service

Here's the general pattern for setting up a reactive deck object and subscribing to it (receiving changes as they 
happen).

Import `ngOnInit`, `DeckService`, `ActivatedRoute` and inject the latter two in the constructor:

    import {OnInit} from "@angular/core";
    import {DeckService} from "../../services/deck.service";
    import {Params, ActivatedRoute} from "@angular/router";
    ...
    ...
    export class ExampleComponent implements OnInit {

      constructor(
        private deckService: DeckService,
        private route: ActivatedRoute,
      ) {}
      ...
      ...
    }

Then, in a method called `ngOnInit` (required to implement `OnInit`):

* Subscribe to the deck BehaviorSubject, specifying that our local deck should be equal to the BehaviorSubject's state.
 
    
    this.deckService.deck
          .subscribe(deck => this.deck = deck);

* Load the deck into the BehaviorSubject from the backend. We subscribe to `this.route.params` because it returns an
observable - essentially, this acts to retrieve the route `params` asynchronously. We only use it to get the `params` 
object, and load the corresponding deck in to the deck BehaviorSubject.
    
    
    this.route.params
      .subscribe((params: Params) => {
        this.deckService.getDeck(params['id']);
      });