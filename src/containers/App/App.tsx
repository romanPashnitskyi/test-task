import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

import { logOut } from "../../core/redux/slices/auth";
import { useAppSelector, useAppDispatch } from "../../core/redux/hooks";

import Routes from "../../router";

import sty from "./App.module.scss";

export const MAIN_PAGES = [
  {
    url: "/sign-in",
    label: "Sign in",
  },
  {
    url: "/sign-up",
    label: "Sign-up",
  },
];

interface PropTypes {}

const App: React.FC<PropTypes> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const pages = [
    {
      url: "/sign-in",
      label: "Sign in",
      show: !user,
    },
    {
      url: "/sign-up",
      label: "Sign up",
      show: !user,
    },
    {
      url: "/add-movie",
      label: "Add movie",
      show: !!user,
    },
    {
      url: "/",
      label: "Movies",
      show: !!user,
    },
    {
      url: "/import-movies",
      label: "Import Movies",
      show: !!user,
    },
  ];

  return (
    <div>
      <header>
        <nav className={sty.nav}>
          <ul>
            {pages.map(
              (p) =>
                p.show && (
                  <li key={p.url}>
                    <NavLink to={p.url}>{p.label}</NavLink>
                  </li>
                )
            )}
          </ul>
          <Button type="primary" size="large" onClick={handleLogOut}>
            Log out
          </Button>
        </nav>
      </header>
      <Routes />
    </div>
  );
};

export default App;
