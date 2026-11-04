import React from "react";
import ReactDOM from "react-dom/client";
// o visual vem do design system: tokens + estilos dos componentes
import "../../design-system/tokens.css";
import "../../design-system/components/bundle.css";
import "./app.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("raiz")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
