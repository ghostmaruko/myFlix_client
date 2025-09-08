import 'bootstrap/dist/css/bootstrap.min.css';
// entry point to the application
import { createRoot } from "react-dom/client";

// import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// import main view component
import { MainView } from "./components/main-view";



// main component
const App = () => {
  return <MainView />;
};

// finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells react to render your app in the root DOM element
root.render(<App />);
