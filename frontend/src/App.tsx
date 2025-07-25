import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./pages/Auth";
import Header from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
  },
  {
    path: "/auth",
    Component: Auth,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
