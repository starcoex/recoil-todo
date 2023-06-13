import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";
import Home from "./Home";

import CountryTemplate from "../components/country/CountryTemplate";
import Layout from "../components/Layout/Layout";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Layout /> },
      {
        path: "/country",
        element: <CountryTemplate />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default routers;
