export interface Item {
  _id: string;
  link: string;
  title: string;
  excerpt: string;
  cover: string;
  created: string;
  domain: string;
}

export interface Data {
  result: boolean;
  items: Item[];
  count: number;
  collectionId: number;
}
