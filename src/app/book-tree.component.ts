import {Component, Input, ViewChildren, QueryList, OnInit} from '@angular/core';
import {Module} from "./module";

@Component({
  selector: 'book-tree',
  template: `<!--<li>-->
  <!--<input type="checkbox" [checked]="selected" (change)="toggleCheckBox()">-->
  <!--<label>{{module?.title}}</label>-->
  <!--<ul *ngIf="module?.children.length > 0" class="book-tree">-->
    <!--<book-tree *ngFor="let child of module?.children" [selected]="selected" [module]="child"></book-tree>-->
  <!--</ul>-->
<!--</li>-->

<div class="panel panel-default">
  <div class="panel-heading" role="tab" id="{{bootstrapDataParent + 'heading'}}">
    <h4 class="panel-title">
        <input type="checkbox" [checked]="selected" (change)="toggleCheckBox()">
        {{module?.title}}
      <a *ngIf="module?.children.length" class="glyphicon glyphicon-chevron-down" role="button" data-toggle="collapse" [attr.data-parent]="bootstrapDataParent" href="{{'#' + bootstrapDataParent + 'collapse'}}" aria-expanded="true" [attr.aria-controls]="module?.title"></a>
    </h4>
  </div>
  <div *ngIf="module?.children.length" id="{{bootstrapDataParent + 'collapse'}}" class="panel-collapse collapse" role="tabpanel" [attr.aria-labelledby]="bootstrapDataParent + 'heading'">
    <div class="panel-body">
      <div class="panel-group" id="{{bootstrapDataParent}}" aria-multiselectable="true">
        <book-tree *ngFor="let child of module?.children" [selected]="selected" [module]="child"></book-tree>
      </div>
    </div>
  </div>
</div>
`
})

export class BookTreeComponent implements OnInit {
  @Input() selected: boolean;
  @Input() module: Module;
  @ViewChildren(BookTreeComponent) subTrees: QueryList<BookTreeComponent>;

  bootstrapDataParent: string;

  ngOnInit(): void {

    if (!this.module.parent) {
      this.bootstrapDataParent = 'book-root';
    } else {
      this.bootstrapDataParent = this.module.title.replace(/\s/g, '').toLowerCase();
    }
  }

  toggleCheckBox(): void {
    this.selected = !this.selected;
  }

  flatMap = (list, func) => [].concat(...list.map(func));

  getValue(): any {
    if (!this.module.parent) {
      if (this.selected) {
        return this.module.uuid;
      }
    }

    if (this.subTrees.length) {
      return this.flatMap(this.subTrees, (t) => t.getValue())
    }

    if (this.selected) {
      return this.module.uuid;
    }
    return [];
  }

}
