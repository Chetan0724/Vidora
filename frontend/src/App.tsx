import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./pages/Auth/Auth";
import Header from "./components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import ResetPassword from "./pages/Reset-Password/ResetPassword";
import Upload from "./pages/Upload/Upload";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
  },
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/upload",
    Component: Upload,
  },
  {
    path: "/profile",
    Component: Profile,
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
