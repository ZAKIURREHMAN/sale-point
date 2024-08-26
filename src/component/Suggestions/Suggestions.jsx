import { useContext, useEffect, useState } from "react";
import { counterContext } from "../../context/AuthContext";
import "./Suggestions.css";
function Suggestions({ searching }) {
  const { data, setHandelItem, handelSuggestions } = useContext(counterContext);
  const [displayitem, setDisplayItem] = useState([]);

  useEffect(() => {
    const item = data.filter((i) =>
      i.title.toLowerCase().includes(searching.toLowerCase())
    );
    setDisplayItem(item);
    setHandelItem(item);
  }, [searching]);

  return (
    <div className="suggestions-container">
      <div
        className={`${handelSuggestions ? "suggestion-box" : "showing"}`}
        id="first"
      >
        {displayitem.map((item) => (
          <div key={item.id}>
            <div className="single-item">
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
