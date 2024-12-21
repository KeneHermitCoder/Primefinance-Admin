import React from "react";
import { ErrorPage } from "./components";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import store from "./store";
import { Login, Layout, Register, Dashboard, LoansHome, } from "./routes";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/protectedRoute";
import { ResponsiveProvider } from "./context/responsiveContext";

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
        element: <Layout home />,
        errorElement: <ErrorPage />,
        children: [
          /**
           * dashboard-related routes
           */
          {
            path: "/",
            element: <Dashboard />,
            errorElement: <ErrorPage />,
          },

          /**
           * loans-related routes
           */
          {
            path: "/loans",
            element: <LoansHome />,
            errorElement: <ErrorPage />,
          }
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
};

export default App;
