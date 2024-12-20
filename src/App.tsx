import React from "react";
import { ErrorPage } from "./components";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import store from "./store";
import { Login, Layout } from "./routes";
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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout home />,
        errorElement: <ErrorPage />,
        children: [
          /**
           * store-related routes
           */
          {
            path: "/store",
            // element: <Store store />,
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
};

export default App;
