import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import App from "./App";
import PublicPage from "./pages/publicPage";
import PrivatePage from "./pages/privatePage";
import ProtectedRoute from "./protectedRoute";

const Routes = () => {
  const role = false;
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/public",
          element: <PublicPage />,
        },
        {
          path: "/private",
          element: <ProtectedRoute role={role} />,
          children: [{ path: "/private", element: <PrivatePage /> }],
        },
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default Routes;
