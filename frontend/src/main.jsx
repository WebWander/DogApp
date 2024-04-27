import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { DogsProvider } from "./DogsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DogsProvider>
    <App />
  </DogsProvider>
);
