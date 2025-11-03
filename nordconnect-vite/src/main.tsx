import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Vite kobler appen til <div id="root"></div> i index.html
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
