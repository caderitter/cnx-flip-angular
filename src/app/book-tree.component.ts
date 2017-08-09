import {Component, Input} from '@angular/core';
import {Module} from "./module";

@Component({
  selector: 'book-tree',
  template: `<li>
  <input type="checkbox" value="{{module?.uuid}}">
  <label>{{module?.title}}</label>
  <ul *ngIf="module?.children.length > 0">
    <book-tree *ngFor="let child of module?.children" [module]="child"></book-tree>
  </ul>
</li>
`
})

export class BookTreeComponent {
  @Input() module: Module;

  appendChild(child: any): void {
    this.module.children.push(child);
  }
}
