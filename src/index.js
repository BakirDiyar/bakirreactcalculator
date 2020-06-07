import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Calculator } from "./App";
import * as serviceWorker from "./serviceWorker";

render(<Calculator InitialValue = {'0'} />, document.getElementById("root"));

serviceWorker.unregister();
