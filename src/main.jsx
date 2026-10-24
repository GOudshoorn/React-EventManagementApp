import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { AboutUs } from "./pages/AboutUs";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { Toaster } from "./components/ui/toaster";
import { EventsProvider } from "./context/eventscontext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        // loader: postLoader,
        // action: addComment,
      },
      {
        path: "/AboutUs/",
        element: <AboutUs/>,
        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
