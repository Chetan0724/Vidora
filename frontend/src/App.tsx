import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import { ThemeProvider } from "@/components/theme-provider";

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
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
