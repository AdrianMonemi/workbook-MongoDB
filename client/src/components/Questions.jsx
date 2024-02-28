import React, { useEffect, useState } from "react";
import "./Questions.css";
import Button from "./Button";

function Questions({ id }) {
  const [textareaValue, setTextareaValue] = useState("");

  const handleChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const submitOnClickHandle = (e, id) => {
    console.log(id);
  };

  return (
    <div>
      
        <textarea
          className="answerField"
          value={textareaValue}
          onChange={handleChange}
        />
        <Button
          onClick={(e) => submitOnClickHandle(e, id)}
          buttonText={"submit"}
        ></Button>
      
    </div>
  );
}

export default Questions;
