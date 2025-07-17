import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Mount the app to the DOM
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ Root container (#root) not found in index.html");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
