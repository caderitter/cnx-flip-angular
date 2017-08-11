/**
 * Recursive component to display a book's tree using Modules.
 */

import {Component, Input, ViewChildren, QueryList, OnInit} from '@angular/core';
import {Module} from "../../models/module";

@Component({
  selector: 'book-tree',
  templateUrl: './book-tree.component.html',
  styleUrls: ['./book-tree.component.css',]
})

export class BookTreeComponent implements OnInit {
  // each component takes 'selected' as input, so when the user selects a module,
  // all of its children are selected too. We initialize the root with 'selected=false'.
  @Input() selected: boolean;

  @Input() module: Module;

  // Select all child book-tree components
  @ViewChildren(BookTreeComponent) subTrees: QueryList<BookTreeComponent>;

  bootstrapDataParent: string;

  ngOnInit(): void {
    // set the 'data-parent' attribute to play nice with bootstrap.
    if (!this.module.parent) {
      this.bootstrapDataParent = 'book-root';
    } else {
      if (this.module.uuid == 'subcol') {
        // assign random ID to subcol modules - 0.02% chance of duplicates, assuming ~25 modules
        this.bootstrapDataParent = (Math.round(Math.random() * 1000000) + 1).toString();
      } else {
        this.bootstrapDataParent = this.module.uuid.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
      }
    }
  }

  toggleCheckBox(): void {
    this.selected = !this.selected;
  }

  flatMap = (list, func) => [].concat(...list.map(func));

  // returns a list of the selected module UUIDs.
  getValue(): any {
    // if we have children, get all of our children's values.
    if (this.subTrees.length) {
      return this.flatMap(this.subTrees, (t) => t.getValue())
    }

    // if we're at a leaf, return the uuid if it's selected.
    if (this.selected) {
      return [this.module.uuid.split('@')[0]];
    }

    return [];
  }

}
