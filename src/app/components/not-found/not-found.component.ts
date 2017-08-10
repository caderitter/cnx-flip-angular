/**
 * Not found component that is displayed if no route is matched.
 */

import {Component} from "@angular/core";

@Component({
  selector: 'not-found',
  template: `<h1 style="text-align: center;">There's nothing here!</h1>
`
})

export class NotFoundComponent {
  title = 'Not Found - OpenStax Flip';
}
