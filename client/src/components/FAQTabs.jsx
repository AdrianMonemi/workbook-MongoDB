import React, { useState, useEffect } from "react";
import "./FAQTabs.css";
import Questions from "./Questions";
import Button from "./Button";

function FAQTabs() {
  const [faqData, setFaqData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/FAQ");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setFaqData(data);
        } else {
          console.error("FAQ data is empty or not in expected format");
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);

  const categoriesExtract = () => {
    const extractedCategories = faqData.map((entry) => entry.category);
    const uniqueCategories = [...new Set(extractedCategories)];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    categoriesExtract();
  }, [faqData]);

 

  return (
    <div>
      <div className="tabs">
        {categories.map((category) => (
          <div key={category}>
            <div className="categoryTitels">{category}</div>

            {faqData
              .filter((entry) => entry.category === category)
              .map((entry) => (
                <div key={entry._id} className="container">
                  <div key={entry._id} className="questions">
                    <div className="entryId">{entry.id}</div>
                    <div className="questionDiv">
                      <div className="question">Question:</div>
                      <div className="questionTitle">{entry.question}</div>
                    </div>
                  </div>
                  <div className="inputDiv">
                    <div className="answerDiv">Answer:</div>
                    <Questions id={entry.id}/>
                    
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQTabs;
