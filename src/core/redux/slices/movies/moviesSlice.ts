import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

import { StatusCode, LoadingStatusCode } from "../../../../models/auth";

import {
  GetMoviesByModel,
  MoviesResponse,
  AddMovieModel,
  RemoveMovieModel,
  RemoveMovieResponse,
  MoviesState,
  GetMovieModel,
  MovieResponse,
} from "../../../../models/movies";

const initialState: MoviesState = {
  movies: undefined,
  moviesTotal: 0,
  addStatus: null,
  removeStatus: null,

  movie: null,
  loadStatus: null,
};

export const getMovies = createAsyncThunk<
  MoviesResponse | null,
  GetMoviesByModel
>("movies/getMoviesBy", async (payload) => {
  const { data, status, meta } = await api
    .get<MoviesResponse>(`/movies`, {
      params: {
        ...payload,
      },
    })
    .then(({ data }) => data);

  if (status === StatusCode.Success) {
    const newData = data.map((v) => {
      return {
        ...v,
        key: v.id,
      };
    });
    return { data: newData, total: meta?.total, status };
  }

  return null;
});

export const getMovie = createAsyncThunk<MovieResponse | null, GetMovieModel>(
  "movies/getMovie",
  async (payload) => {
    const { data, status } = await api
      .get<MovieResponse>(`/movies/${payload.id}`)
      .then(({ data }) => data);

    if (status === StatusCode.Success) {
      return { data, status };
    }

    return null;
  }
);

export const addMovie = createAsyncThunk<{}, AddMovieModel>(
  "movies/addMovie",
  async (payload) => {
    const { status } = await api
      .post<MoviesResponse>(`/movies`, payload)
      .then(({ data }) => data);

    return status;
  }
);

export const removeMovie = createAsyncThunk<{}, RemoveMovieModel>(
  "movies/removeMovie",
  async (payload) => {
    const { status } = await api
      .delete<RemoveMovieResponse>(`/movies/${payload.id}`)
      .then(({ data }) => data);

    return status;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getMovies.pending.toString()]: (state) => {},
    [getMovies.fulfilled.toString()]: (state, { payload }) => {
      state.movies = payload.data;
      state.moviesTotal = payload.total;
    },
    [getMovies.rejected.toString()]: (state) => {},

    [addMovie.pending.toString()]: (state) => {
      state.addStatus = LoadingStatusCode.Loading;
    },
    [addMovie.fulfilled.toString()]: (state, { payload }) => {
      state.addStatus = LoadingStatusCode.Success;

      if (!!payload) {
        state.addStatus = LoadingStatusCode.Success;
      } else {
        state.addStatus = LoadingStatusCode.Error;
      }
    },
    [addMovie.rejected.toString()]: (state) => {
      state.addStatus = LoadingStatusCode.Error;
    },

    [removeMovie.pending.toString()]: (state) => {
      state.removeStatus = LoadingStatusCode.Loading;
    },
    [removeMovie.fulfilled.toString()]: (state, { payload }) => {
      if (!!payload) {
        state.removeStatus = LoadingStatusCode.Success;
      } else {
        state.removeStatus = LoadingStatusCode.Error;
      }
    },
    [removeMovie.rejected.toString()]: (state) => {
      state.removeStatus = LoadingStatusCode.Error;
    },

    [getMovie.pending.toString()]: (state) => {
      state.loadStatus = LoadingStatusCode.Loading;
    },
    [getMovie.fulfilled.toString()]: (state, { payload }) => {
      if (!!payload) {
        state.movie = payload.data;
        state.loadStatus = LoadingStatusCode.Success;
      } else {
        state.loadStatus = LoadingStatusCode.Error;
      }
    },
    [getMovie.rejected.toString()]: (state) => {
      state.loadStatus = LoadingStatusCode.Error;
    },
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
