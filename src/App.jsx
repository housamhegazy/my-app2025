
import { BrowserRouter } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home/home.jsx";
import Html from "./pages/html.jsx";
import { useContext } from "react";
import ThemeContexttt from "./context/themeContext.jsx";
import Singin from "./pages/signin/Singin.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import EditTask from "./pages/edit tasks/EditTask.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/html",
    element: <Html />,
  },
  {
    path: "/edittask/:id",
    element: <EditTask />,
  },
  {
    path: "/signin",
    element: <Singin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "*", // This matches any URL that didn't match above
    element: <ErrorPage />,
  },
]);
function App() {
      const {theme} = useContext(ThemeContexttt);
  return (
    <div className={`App ${theme}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
