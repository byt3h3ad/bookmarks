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

export const config = {
  siteURL: "https://bookmarks.adhiraj.tech",
  author: {
    name: "Adhiraj",
    link: "https://adhiraj.tech",
  },
};
