import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { FaGithub } from "react-icons/fa";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <a
          href="https://github.com/IgorStojadinovic/tech-notes"
          target="_blank"
          className="absolute bottom-0 right-0"
        >
          <FaGithub size={40} />
        </a>

        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
