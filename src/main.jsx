import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
// import App from './App.jsx'
import { BrowserRouter } from "react-router";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/home.jsx';
import Html from './pages/html.jsx';
import Css from './pages/css.jsx';
import Error from './pages/Error.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
    errorElement:<Error/>,

  },
  {
    path: "/html",
    element:<Html/>
  },
  {
    path: "/css",
    element:<Css/>
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  
)
