import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Toaster toastOptions={{ position: "bottom-center" }} />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
