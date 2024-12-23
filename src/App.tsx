import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { ErrorPage } from "./components";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/protectedRoute";
import { ResponsiveProvider } from "./context/responsiveContext";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import {
  Bills,
  Login,
  Users,
  Layout,
  Escrow,
  Logout,
  Settings,
  Register,
  Dashboard,
  LoansHome,
  Transactions,
  Notifications,
} from "./routes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/loans",
            element: <LoansHome />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/transactions",
            element: <Transactions />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/escrow",
            element: <Escrow />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/bills",
            element: <Bills />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/users",
            element: <Users />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/notifications",
            element: <Notifications />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/settings",
            element: <Settings />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/logout",
            element: <Logout />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  }, 
]);

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ResponsiveProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </ResponsiveProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;