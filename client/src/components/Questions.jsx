import React, {useEffect, useState} from "react";
import "./Questions.css";

function Questions({props}){

  return(
    <div>
      <form>
        <textarea className="answerField">{props.answer}</textarea>
      </form>
      
    </div>
  );
}

export default Questions;