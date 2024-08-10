import ReactDOM from "react-dom/client";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "@/App.tsx";
import "@/index.css";
import OpenRoute from "@/components/auth/OpenRoute";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Error from "@/pages/Error";
import Dashboard from "@/pages/Dashboard";
import OverView from "@/components/core/dashboard/OverView";
import Settings from "@/components/core/dashboard/Settings";
import Products from "@/components/core/dashboard/Products";
import Users from "@/components/core/dashboard/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      /* ===== open routes ===== */
      {
        path: "login",
        element: (
          <OpenRoute>
            <Login />
          </OpenRoute>
        ),
      },
      /* ===== private routes ===== */
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <OverView />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      /* ===== error route ===== */
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="error" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
