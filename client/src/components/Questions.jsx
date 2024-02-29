import React, { useEffect, useState } from "react";
import "./Questions.css";
import Button from "./Button";

function Questions({ id, loadedAnswer, getAnswer }) {
  const [textareaValue, setTextareaValue] = useState("");
  const [textAreaActive, setTextAreaActive] = useState(false);

  const handleChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const submitOnClickHandle = async () => {
    try {
      setTextAreaActive(false);
      getAnswer();
      const response = await fetch("http://localhost:8080/api/FAQ/sendAnswer", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          answer: textareaValue,
        }),
      });
      console.log(textareaValue);

      console.log(textAreaActive);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit answer");
      }

      console.log("Answer submitted successfully");
    } catch (error) {
      console.error("Error submitting answer:", error.message);
    }
  };

  const editAnswerOnClickHandle = () => {
    setTextAreaActive(true);
    console.log(textAreaActive);
  };

  return (
    <div>
      {textAreaActive && <textarea
        className="answerField"
        value={textareaValue}
        onChange={handleChange}
      />}

      {!textAreaActive && <p>{loadedAnswer}</p>}

      <Button onClick={submitOnClickHandle} buttonText={"submit"}></Button>

      <Button
        onClick={editAnswerOnClickHandle}
        buttonText={"edit answer"}
      ></Button>
    </div>
  );
}

export default Questions;
