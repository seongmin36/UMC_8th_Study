import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found.tsx";
import Movies from "./pages/movies.tsx";

import RootLayout from "./layout/root-layout.tsx";
import HomePage from "./pages/home.tsx";
// import SearchPage from "./cleanUpFunction/searchPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category",
        element: <Movies />,
      },
    ],
  },

  // {
  //   path: "/searchPage",
  //   element: <SearchPage />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
