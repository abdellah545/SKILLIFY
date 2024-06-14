import React, { useState } from "react";
import "./ChatBot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faMinus } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../Helper/CookiesHelper";
import axios from "axios";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false); // State to control minimization

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // const handleSendClick = () => {
  //   const newMessage = { text: input, user: "you" };
  //   setMessages([...messages, newMessage]);
  //   setInput("");

  //   // Simulate a response
  //   setTimeout(() => {
  //     const botMessage = { text: `${input}`, user: "bot" };
  //     setMessages((messages) => [...messages, botMessage]);
  //   }, 500);
  // };

  const handleSendClick = async () => {
    const newMessage = { text: input, user: "you" };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post(
        "https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=87b128b9-e904-45a8-a3dd-a38556349b87",
        {
          type: "text",
          text: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("AccessTokenBot"),
          },
        }
      );
      const botMessage = { text: response.data.responses[0].text, user: "bot" };
      setMessages((messages) => [...messages, botMessage]);
    } catch (error) {
      console.error("Error sending message to bot:", error);
    }

    setInput("");
  };

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className="chat-container"
      style={{
        borderTop: "2px solid #5151d3",
        borderRight: "2px solid #5151d3",
        borderLeft: "2px solid #5151d3",
      }}
    >
      <h5
        style={{ textAlign: "center", fontWeight: "bold", color: "#5151d3" }}
        className="d-flex justify-content-between align-items-center"
      >
        <span>Ask a question</span>
        <FontAwesomeIcon
          icon={faMinus}
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={toggleChat}
        />
      </h5>

      {!isMinimized && (
        <>
          <hr />
          <div
            style={{ height: "300px", overflowX: "hidden", overflowY: "auto" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.user === "you" ? "right" : "left",
                  backgroundColor: msg.user === "you" ? "#5151d3" : "white",
                  color: msg.user === "you" ? "white" : "black",
                  padding: "5px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  maxWidth: "80%",
                  marginLeft: msg.user === "you" ? "auto" : "10px",
                  marginRight: msg.user === "you" ? "10px" : "auto",
                }}
              >
                {msg.user === "bot" && (
                  <FontAwesomeIcon
                    icon={faRobot}
                    style={{ color: "#5151d3", display: "inline" }}
                  />
                )}
                <p className="m-0 p-1 d-inline">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-evenly align-items-center">
            <input
              type="text"
              className="form-control mx-2"
              value={input}
              onChange={handleInputChange}
            />
            <button
              className="btn"
              style={{ backgroundColor: "#5151d3" }}
              onClick={handleSendClick}
            >
              <i
                className="fa-solid fa-paper-plane"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatApp;
