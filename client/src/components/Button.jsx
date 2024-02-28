import React, { useEffect, useState } from "react";
import "./Button.css";

function Button({ onClick, buttonText }) {
  return (
    <div>
      <button type="submit" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default Button;
