import { RouteObject } from "react-router";
import React from "react";
import Layout from "../components/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import MyBetsPage from "../pages/MyBetsPage";
import EventsPage from "../pages/EventsPage";
import EventPage from "../pages/EventPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        index: true,
        element: <EventsPage />,
      },
      {
        path: `/events/:eventId`,
        element: <EventPage />,
      },
      {
        path: "/my-bets",
        element: <MyBetsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
