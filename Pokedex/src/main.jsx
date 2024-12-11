import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PokedexProvider from "./context/Context.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PokedexProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PokedexProvider>
  </BrowserRouter>
);
