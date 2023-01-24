import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.scss";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import createRouter from "./create-router";
import { PersistGate } from "redux-persist/integration/react";

const router = createRouter();

router.start(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
});
