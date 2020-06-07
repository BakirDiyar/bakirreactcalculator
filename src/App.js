import React, { useState } from "react";
import "./App.css";
import { Result } from "./components/view";
import { Btn } from "./components/button";
import { btnList } from "./components/button/listButton";

export function Calculator({ InitialValue }) {
  //create states with hooks

  //create result state and setResult to assign the result procced,  this value initialized in InitialValue
  const [result, setResult] = useState(InitialValue);
    //create countDot state and setCountDot initialized in 0
  const [countDot, setCountDot] = useState(0)

  // this function return boolean if the last digit is sign
  const isSignLast = (val) => {
    const sign = /[+/\-x*.]$/; // regular expression
    return sign.test(val);  // returns the test result (true/false)
  };
  
  //boolean expression where it is checked if the value is 0
  const isZero = (val) => val === '0';
  
  //boolean expression where it is checked if the value is dot
  const isDot = (val) => val === '.';
  
   // this function return boolean if the value contein number
  const isNumber = (val) => {
    const numbers = /[0-9]/; // regular expression 
    return numbers.test(val); //returns the test result (true/false)
  };

  //this function remove the digits last of the value received
  function deleteDigit (dig, quantity) {
    let arrayDigs = dig.split(''); // convert string to array format to acces to each value
  
    if (arrayDigs.length > 1) {  // eval if length array is great than 1. to remove the valus received
      return arrayDigs.slice(0, arrayDigs.length - quantity).join(''); //cut the character array and convert it to string, and returnit value
    }
  
    //if  length array is 0, return 0
    return '0';
  };
  
  //function  to change tha last digit
  function changeLastElement (dig, value, quantity) {
    let arrayDigs = dig.split('');
    arrayDigs[dig.length - quantity] = value;
  
    return arrayDigs.join('');
  };

  //function eval the action (button content) to calculate exec
  function calcProcess(value) {
    if (isSignLast(value)) { //eval if last digit is sign
      if (isDot(value)) { //eval if last digit is dot
        setCountDot((count) => count + 1);

        if (countDot < 1) {
          setResult((res) => res + value);
        }
      } 
      else {
        setCountDot(0);

        if (isSignLast(result)) { //eval if last digit is sign
          if (value === '-' && result[result.length - 1] !== value) {  //eval if operation start with -
            setResult((res) => res + value);
          } 
          else if (value !== '-' && result[result.length - 1] === '-' && !(isNumber(result[result.length - 2]))) { //eval if operation start with -
            setResult((res) => deleteDigit(res, 2));
            setResult((res) => res + value);
          } 
          else if (value !== '-') {
            setResult((res) => changeLastElement(res, value, 1));
          }
        } else { // assign the value (concat)
          setResult((res) => res + value);
        }
      }
    } else if (isZero(result)) { //eval if digit is 0
      setResult(value);
    } else {
      setResult((res) => res + value); // assign the value (concat)
    }
  }
  
  //function to calculate the operation
  function process() {
    if (isSignLast(result)) {
      //if last digit is sign, it is removed
      setResult((res) => deleteDigit(res, 1));
    } 
    else {
      // passed result to state
      setResult((res) => eval(res).toString());

      if (eval(result) % 1 === 0) {
        setCountDot(0);
      }
    }
  }

  //function to reset result to 0
  function clearResul() {
    setResult('0');
  }

  //function to back one digit
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

  //function to eval action each buttom
  function buttonAction(e){

    let { innerHTML } = e.target; // get the content of the button that generated the event
    let value = innerHTML.trim(); // remove white spaces
    value = (value=="x")? "*" : value  //eval if content is x return *, else return the content

    //eval value to exec action
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
        calcProcess(value);
        break;
    }
  }
  
  return (
    <div className="App">
      <div className="wrp-result">
        {/* passed value result to Result component */}
        <Result calc={result} /> 
      </div>
      <div className="wrp-btns">
        {/* iterate the array items to create components with each item passing the value and event */}
        {btnList.map((b) => (
          <Btn key={b} onClick={buttonAction}>
            {b}
          </Btn>
        ))}
      </div>
    </div>
  );
}
