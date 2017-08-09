export class Module {

  title: string;
  uuid: string;
  children: any;

  constructor(title: string, uuid: string, children: any[]) {
    this.title = title;
    this.uuid = uuid;
    this.children = children;
  }

  appendChild(child: any): void {
    this.children.push(child);
  }
}
