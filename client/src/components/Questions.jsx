import React, { useEffect, useState } from "react";
import "./Questions.css";
import Button from "./Button";

function Questions({ props }) {
  const [textareaValue, setTextareaValue] = useState("");

  const handleChange = (e) => {
    setTextareaValue(e.target.value);
  };

  return (
    <div>
      <form>
        <textarea
          className="answerField"
          value={textareaValue}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Questions;
