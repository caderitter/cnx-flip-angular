import {Component, Input, ViewChildren, QueryList, OnInit} from '@angular/core';
import {Module} from "../../models/module";

@Component({
  selector: 'book-tree',
  templateUrl: './book-tree.component.html'
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
      this.bootstrapDataParent = this.module.title.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
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
