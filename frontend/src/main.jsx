import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UnitsProvider } from "./contexts/Units";
import { IngredientsProvider } from "./contexts/Ingredients";

import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UnitsProvider>
      <IngredientsProvider>
        <App />
      </IngredientsProvider>
    </UnitsProvider>
  </BrowserRouter>
);
