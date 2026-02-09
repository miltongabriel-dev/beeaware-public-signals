export type Feed = {
  name: string;
  url: string;
  defaultConfidence: number;
};

export const FEEDS: Feed[] = [
  {
    name: "BBC London",
    url: "https://feeds.bbci.co.uk/news/england/london/rss.xml",
    defaultConfidence: 0.7
  },
  {
    name: "Evening Standard",
    url: "https://www.standard.co.uk/rss",
    defaultConfidence: 0.65
  },
  {
    name: "MyLondon Crime",
    url: "https://www.mylondon.news/all-about/crime?service=rss",
    defaultConfidence: 0.6
  },
  {
    name: "London News Online",
    url: "https://londonnewsonline.co.uk/feed/",
    defaultConfidence: 0.6
  }
];
