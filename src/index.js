import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Calculator } from "./App"; // component Calculator imported
import * as serviceWorker from "./serviceWorker";

// renderized and initialization the component
render(<Calculator InitialValue = {'0'} />, document.getElementById("root"));

serviceWorker.unregister();
