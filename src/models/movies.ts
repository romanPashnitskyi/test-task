import { StatusCode, LoadingStatusCode } from "./auth";

export interface MoviesState {
  movies: MoviesData[] | undefined;
  moviesTotal: number;
  addStatus: LoadingStatusCode | null;
  removeStatus: LoadingStatusCode | null;

  movie: MoviesData | null;
  loadStatus: LoadingStatusCode | null;
}

export interface GetMoviesByModel {
  search: string | null;
  sort: "id" | "title" | "year";
  order: "ASC" | "DESC";
  limit: number;
  offset: number;
}

export interface MoviesData {
  key: string;
  id: string;
  title: string;
  year: number;
  format: string;
  actors?: ActorsResponse[];
}

export interface MoviesResponse {
  data: MoviesData[];
  meta?: { total: number };
  status: StatusCode;
}

export interface RemoveMovieResponse {
  status: StatusCode;
}

export interface ActorsResponse {
  id: string;
  name: string;
}

export interface RemoveMovieModel {
  id: string;
}

export interface AddMovieModel {
  name: string;
  year: number;
  format: string;
  actors: string[];
}

export interface GetMovieModel {
  id: string;
}

export interface MovieResponse {
  data: MoviesData[];
  status: StatusCode;
}

export interface DataType {
  key: string;
  id: string;
  title: string;
  year: number;
  format: string;
}
