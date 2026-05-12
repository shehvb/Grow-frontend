import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#15803d",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
