import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Movies from "./containers/Movies";
import Movie from "./containers/Movie";
import AddMovie from "./containers/AddMovie";
import ImportMovies from "./containers/ImportMovies";
import NotFound from "./containers/NotFound"

import { useAppSelector } from "./core/redux/hooks";


interface PrivateRouteProp {
  children: JSX.Element;
  allow?: boolean;
  redirect?: string;
}

const CustomRoute = ({
  children,
  allow = true,
  redirect,
}: PrivateRouteProp) => {
  let location = useLocation();

  if (!allow) {
    return (
      <Navigate
        to={{ pathname: redirect || "/sign-in" }}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};

const Router = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/sign-in"
        element={
          <CustomRoute allow={!user} redirect="/">
            <SignIn />
          </CustomRoute>
        }
      />

      <Route
        path="/sign-up"
        element={
          <CustomRoute allow={!user} redirect="/">
            <SignUp />
          </CustomRoute>
        }
      />

      <Route
        path="/"
        element={
          <CustomRoute allow={!!user}>
            <Movies />
          </CustomRoute>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <CustomRoute allow={!!user}>
            <Movie />
          </CustomRoute>
        }
      />

      <Route
        path="/add-movie"
        element={
          <CustomRoute allow={!!user}>
            <AddMovie />
          </CustomRoute>
        }
      />

      <Route
        path="/import-movies"
        element={
          <CustomRoute allow={!!user}>
            <ImportMovies />
          </CustomRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
