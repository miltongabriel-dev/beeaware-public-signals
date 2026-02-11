// src/feeds/feeds.registry.ts

export type Feed = {
  name: string;
  url: string;
  defaultConfidence: number;
  region:
  | "london"
  | "south_east"
  | "south_west"
  | "midlands"
  | "north_west"
  | "north_east"
  | "yorkshire"
  | "wales"
  | "scotland"
  | "northern_ireland";

  type: "news" | "police" | "transport";
};

export const FEEDS: Feed[] = [

// ======================
// POLICE – UK WIDE
// ======================

{
  name: "Metropolitan Police",
  url: "https://news.met.police.uk/rss",
  defaultConfidence: 0.9,
  region: "london",
  type: "police",
},
{
  name: "Greater Manchester Police",
  url: "https://www.gmp.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "north_west",
  type: "police",
},
{
  name: "West Midlands Police",
  url: "https://www.west-midlands.police.uk/news?feed=rss",
  defaultConfidence: 0.9,
  region: "midlands",
  type: "police",
},
{
  name: "West Yorkshire Police",
  url: "https://www.westyorkshire.police.uk/news?feed=rss",
  defaultConfidence: 0.9,
  region: "yorkshire",
  type: "police",
},
{
  name: "Merseyside Police",
  url: "https://www.merseyside.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "north_west",
  type: "police",
},
{
  name: "Northumbria Police",
  url: "https://www.northumbria.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "north_east",
  type: "police",
},
{
  name: "Kent Police",
  url: "https://www.kent.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "south_east",
  type: "police",
},
{
  name: "Essex Police",
  url: "https://www.essex.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "south_east",
  type: "police",
},
{
  name: "Thames Valley Police",
  url: "https://www.thamesvalley.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "south_east",
  type: "police",
},
{
  name: "Hampshire Police",
  url: "https://www.hampshire.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "south_east",
  type: "police",
},
{
  name: "Police Scotland",
  url: "https://www.scotland.police.uk/whats-happening/news/rss/",
  defaultConfidence: 0.9,
  region: "scotland",
  type: "police",
},
{
  name: "South Wales Police",
  url: "https://www.south-wales.police.uk/news/?feed=rss",
  defaultConfidence: 0.9,
  region: "wales",
  type: "police",
},
{
  name: "PSNI",
  url: "https://www.psni.police.uk/news/rss",
  defaultConfidence: 0.9,
  region: "northern_ireland",
  type: "police",
},
{
  name: "BBC London",
  url: "https://feeds.bbci.co.uk/news/england/london/rss.xml",
  defaultConfidence: 0.7,
  region: "london",
  type: "news",
},
{
  name: "MyLondon Crime",
  url: "https://www.mylondon.news/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "london",
  type: "news",
},
{
  name: "Manchester Evening News Crime",
  url: "https://www.manchestereveningnews.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "north_west",
  type: "news",
},
{
  name: "Liverpool Echo Crime",
  url: "https://www.liverpoolecho.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "north_west",
  type: "news",
},
{
  name: "Birmingham Mail Crime",
  url: "https://www.birminghammail.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "midlands",
  type: "news",
},
{
  name: "Yorkshire Post",
  url: "https://www.yorkshirepost.co.uk/news/rss",
  defaultConfidence: 0.65,
  region: "yorkshire",
  type: "news",
},
{
  name: "Bristol Live Crime",
  url: "https://www.bristolpost.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "south_west",
  type: "news",
},
{
  name: "Surrey Live",
  url: "https://www.getsurrey.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "south_east",
  type: "news",
},
{
  name: "Sussex Live",
  url: "https://www.sussexlive.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "south_east",
  type: "news",
},
{
  name: "Wales Online Crime",
  url: "https://www.walesonline.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "wales",
  type: "news",
},
{
  name: "BBC Scotland",
  url: "https://feeds.bbci.co.uk/news/scotland/rss.xml",
  defaultConfidence: 0.7,
  region: "scotland",
  type: "news",
},
{
  name: "Glasgow Live",
  url: "https://www.glasgowlive.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "scotland",
  type: "news",
},
{
  name: "Chronicle Live",
  url: "https://www.chroniclelive.co.uk/all-about/crime?service=rss",
  defaultConfidence: 0.65,
  region: "north_east",
  type: "news",
},
{
  name: "Sky News UK",
  url: "https://feeds.skynews.com/feeds/rss/uk.xml",
  defaultConfidence: 0.6,
  region: "london",
  type: "news",
},
{
  name: "BBC UK",
  url: "https://feeds.bbci.co.uk/news/uk/rss.xml",
  defaultConfidence: 0.6,
  region: "london",
  type: "news",
},
  

];
