import React, { useState } from "react";
import style from "./TagsInput.module.css"; // Import or define CSS styles here

function TagsInput({ value, setValue, placeholder }) {
  const [input, setInput] = useState("");
  // Normalize: always work with an array even if API returns undefined/string
  const safeValue = Array.isArray(value) ? value : [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!safeValue.includes(input.trim())) {
        setValue([...safeValue, input.trim()]);
        setInput("");
      }
    }
  };

  const removeTag = (tag) => {
    setValue(safeValue.filter((item) => item !== tag));
  };

  return (
    <div className={style.tagsInput}>
      <ul>
        {safeValue.map((tag, index) => (
          <li key={index}>
            {tag}
            <button
              type="button"
              className={style.deleteButton}
              onClick={() => removeTag(tag)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default TagsInput;
