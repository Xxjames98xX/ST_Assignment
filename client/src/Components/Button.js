import React, { useState } from 'react';

function Button({label, onClick}){
 const [isPressed, setIsPressed] = useState(false);
  return (
    <>
      <button
        style={{
          padding: "12px 32px",
          fontSize: "1.2rem",
          borderRadius: "6px",
          backgroundColor: isPressed ? "#4072b3" : "#5999ff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: isPressed ? "inset 2px 2px 6px #345" : "none",
          transform: isPressed ? "translateY(2px)" : "none"
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}

export default Button;