import React, { useState, useEffect } from "react";

function FAQTabs() {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/FAQ/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
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

  return (
    <div>
      <div className="tabs">
        {faqData.map((entry) => (
          <div key={entry._id}>
            <div>
              {entry.category}
              <ul>
                <li key={entry.id}>
                  <div>Frage: {entry.question}</div>
                  <div>Antwort: {entry.answer}</div>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQTabs;
