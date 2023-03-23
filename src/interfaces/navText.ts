export interface IText {
  title: string;
  href: string;
}
export interface IFlexGroup {
  title: string;
  data: IGroupData[] | IHrefGroup[];
}

export interface IGroupData {
  title: string;
  data: IHrefGroup[];
  href?: string;
}

export interface IHrefGroup {
  title: string;
  href: string;
}

export interface IHoverGroup {
  title: string;
  data: IHrefGroup[];
  href: undefined;
}

export interface IGroup {
  title: string;
  data: IGroupData[] | IHrefGroup[];
}

// interface IGroupData {
//   title: string;
//   data: IHrefGroup[];
//   href: string;
// }

// interface IHrefGroup {
//   title: string;
//   href: string;
// }
