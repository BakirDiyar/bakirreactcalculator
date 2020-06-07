import React, { useState } from "react";
import "./App.css";
import { Result } from "./components/view";
import { Btn } from "./components/button";
import { btnList } from "./components/button/listButton";

export function Calculator({ InitialValue }) {
  const [result, setResult] = useState(InitialValue);

  function calc(e){
    let { innerHTML } = e.target;
    let value = innerHTML.trim();
    value = (value=="x")? "*" : value

    setResult(value);
  };

  return (
    <div className="App">
      <div className="wrp-result">
        <Result calc={result} />
      </div>
      <div className="wrp-btns">
        {btnList.map((b) => (
          <Btn key={b} onClick={calc}>
            {b}
          </Btn>
        ))}
      </div>
    </div>
  );
}
