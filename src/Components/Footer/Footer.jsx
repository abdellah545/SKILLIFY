import React from "react";
import ChatApp from "../../chatBot/ChatBot";

export default function Footer() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          color: "#5151d3",
          textAlign: "center",
          fontSize: "15px",
          fontWeight: "bold",

          // lineHeight: "40px",
          width: "100%",
          backgroundColor: "white",
          margin: "auto",
        }}
        className="fixed-bottom"
      >
        All Rights Reserved
      </div>
      {/* <ChatApp /> */}
    </div>
  );
}
