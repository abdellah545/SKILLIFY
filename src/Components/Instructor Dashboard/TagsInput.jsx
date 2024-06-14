import React, { useState } from "react";
import style from "./TagsInput.module.css"; // Import or define CSS styles here

function TagsInput({ value, setValue, placeholder }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        setValue([...value, input.trim()]);
        setInput("");
      }
    }
  };

  const removeTag = (tag) => {
    setValue(value.filter((item) => item !== tag));
  };

  return (
    <div className={style.tagsInput}>
      <ul>
        {value.map((tag, index) => (
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
