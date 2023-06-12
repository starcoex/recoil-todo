import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";
import Home from "./Home";

import CountryTemplate from "../components/country/CountryTemplate";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "/country",
        element: <CountryTemplate />,
      },
    ],
  },
]);

export default routers;
