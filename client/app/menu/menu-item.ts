export class MenuItem {
  title: string;
  ref: string;
  children: MenuItem[];

  icon?: string;

  constructor(
    title: string = '',
    ref: string = '/',
    icon: string = '',
    children: MenuItem[] = []
  ) {
    this.title = title;
    this.ref = ref;
    this.icon = icon;
    this.children = children;
  }

  isGroup() {
    return this.children && this.children.length > 0;
  }
}
