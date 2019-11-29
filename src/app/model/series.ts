import {Genre} from "./genre";

export class Series {
  id: number = 0;
  title: string = "";
  desc: string = "";
  longDesc: string = "";
  release: number = 2010;
  cover: string = "";
  watched: number = 0;
  watching: number = 0;
  genres: Genre[] = null;
}
