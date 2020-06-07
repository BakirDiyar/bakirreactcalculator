import React from "react";
import "./style.css";

export const Btn = ({ children, onClick }) => (
  <div className="btn" onClick={onClick}>
    {children}
  </div>
);
