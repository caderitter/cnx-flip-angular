/**
 * Doubly-linked tree representing a book.
 */

export class Module {

  title: string;
  uuid: string;
  parent: any;
  children: any;

  constructor(title: string, uuid: string, children: any[]) {
    this.title = title;
    this.uuid = uuid;
    this.parent = null;
    this.children = children;
  }

  appendChild(child: any): void {
    this.children.push(child);
  }

  appendParent(parent: any): void {
    this.parent = parent;
  }
}
