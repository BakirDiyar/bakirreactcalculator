import React, { useState } from "react";
import "./App.css";
import { Result } from "./components/view";
import { Btn } from "./components/button";
import { btnList } from "./components/button/listButton";

export function Calculator({ InitialValue }) {
  const [result, setResult] = useState(InitialValue);
  const [countDot, setCountDot] = useState(0)

  const isSignLast = (val) => {
    const sign = /[+/\-x*.]$/;
    console.log('is sing ', sign.test(val));
    return sign.test(val);
  };
  
  const isZero = (val) => val === '0';
  
  const isDot = (val) => val === '.';
  
  const isNumber = (val) => {
    const numbers = /[0-9]/;
    return numbers.test(val);
  };

  const deleteDigit = (dig, quantity) => {
    let arrayDigs = dig.split('');
  
    if (arrayDigs.length > 1) {
      return arrayDigs.slice(0, arrayDigs.length - quantity).join('');
    }
  
    return '0';
  };
  
  const changeLastElement = (dig, value, quantity) => {
    let arrayDigs = dig.split('');
    arrayDigs[dig.length - quantity] = value;
  
    return arrayDigs.join('');
  };

  function othersActions(value) {
    if (isSignLast(value)) {
      if (isDot(value)) {
        console.log('count ', countDot);
        setCountDot((count) => count + 1);

        if (countDot < 1) {
          setResult((res) => res + value);
        }
      } else {
        setCountDot(0);

        if (isSignLast(result)) {
          if (value === '-' && result[result.length - 1] !== value) {
            setResult((res) => res + value);
          } else if (value !== '-' && result[result.length - 1] === '-' && !(isNumber(result[result.length - 2]))) {
            setResult((res) => deleteDigit(res, 2));
            setResult((res) => res + value);
          } else if (value !== '-') {
            setResult((res) => changeLastElement(res, value, 1));
          }
        } else {
          setResult((res) => res + value);
        }
      }
    } else if (isZero(result)) {
      setResult(value);
    } else {
      setResult((res) => res + value);
    }
  }
  
  function process() {
    if (isSignLast(result)) {
      setResult((res) => deleteDigit(res, 1));
    } 
    else {
      setResult((res) => eval(res).toString());

      if (eval(result) % 1 === 0) {
        setCountDot(0);
      }
    }
  }

  function clearResul() {
    setResult('0');
  }

  function back(){
   
    let dig = result
    if(dig.length>1){  
      if(Array.isArray(dig)){
        dig.splice(dig.length-1,1).join()
        setResult(dig)  
      }
      else{
        setResult(deleteDigit(dig,1))
      }
    }
    else{
      setResult('0')
    }
  }


  function calc(e){
    let { innerHTML } = e.target;
    let value = innerHTML.trim();
    value = (value=="x")? "*" : value

    switch (value) {
      case 'AC':
        clearResul();
        break;
      case 'C':
        back();
        break;
      case '=':
        process();
        break;
      default:
        othersActions(value);
        break;
    }
  }
  
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
