import React, { useState, useEffect } from "react";
import "./FAQTabs.css";
import Questions from "./Questions";

function FAQTabs() {
  const [faqData, setFaqData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/FAQ");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setFaqData(data);
          categoriesExtract();
          console.log(categories);
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
    const extractedCategories = faqData.map(entry => entry.category);
    const uniqueCategories = [...new Set(extractedCategories)];
    setCategories(uniqueCategories);
  };

  console.log(categories);
  


  return (
    <div>
      <div className="tabs">
        {categories.map((category) => (
          <div key={category} className="categoryTitels">
            {category}
            {faqData
              .filter((entry) => entry.category === category)
              .map((entry) => (
                <div key={entry._id} className="questions">
                  <ul>
                    <li key={entry.id}>
                      <div>Frage: {entry.question}</div>
                      <div>Antwort: {entry.answer} <Questions props={faqData} /></div>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default FAQTabs;
