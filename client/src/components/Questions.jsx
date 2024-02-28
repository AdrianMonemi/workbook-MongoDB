import React, { useEffect, useState } from "react";
import "./Questions.css";
import Button from "./Button";

function Questions({ id }) {
  const [textareaValue, setTextareaValue] = useState("");

  const handleChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const submitOnClickHandle = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/FAQ/sendAnswer', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          answer: textareaValue,
        }),
      });
      console.log(textareaValue);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit answer');
      }

      console.log('Answer submitted successfully');

    } catch (error) {
      console.error('Error submitting answer:', error.message);
    }
  };

  return (
    <div>
      
        <textarea
          className="answerField"
          value={textareaValue}
          onChange={handleChange}
        />
        <Button
          onClick={submitOnClickHandle}
          buttonText={"submit"}
        ></Button>
      
    </div>
  );
}

export default Questions;
