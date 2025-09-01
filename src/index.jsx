import { createRoot } from "react-dom/client";

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// main component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>
        <h1> Hello Monsters! </h1>{" "}
      </div>
    </div>
  );
};

// finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render your app in the root DOM element
root.render(<MyFlixApplication />);
