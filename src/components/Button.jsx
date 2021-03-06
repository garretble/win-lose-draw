import React from "react";

const Button = props => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type || "button"}
      className={props.class}
    >
      {props.text}
    </button>
  );
};

export default Button;
