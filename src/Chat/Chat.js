import { useEffect, useState } from "react";
import ChatWidgetButton from "./ChatWidgetButton";
import ChatWrapper from "./ChatWrapper";
import "./chat.css";
import mockMessages from "./mock-message.json";

const ChatThread = {
  userId: 2,
  threadName: "Neom Chat Widget POC",
  appId: 2,
  threadId: 3,
};

const BaseUrl = "http://localhost:8080/v1";
const CreateThreadUrl = `${BaseUrl}/chat-thread/chatThreads`;
const ChatsByThread = `${BaseUrl}/chat/history/${ChatThread.threadId}?limit=50`;
const SendMessageUrl = `${BaseUrl}/chat/openai/query`;

async function createThread() {
  fetch(CreateThreadUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: ChatThread.userId,
      threadName: ChatThread.threadName,
      appId: ChatThread.appId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState(mockMessages);

  async function getAllMessagesByThread() {
    fetch(ChatsByThread, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {        
        data.length && setChatMessages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function sendQuery(query) {
    fetch(SendMessageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: ChatThread.userId,
        message: query,
        threadId: ChatThread.threadId,
      }),
    })
      .then((response) => response)
      .then((data) => {        
        // onMessageSubmit(data);
        getAllMessagesByThread();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const onMessageSubmit = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, { ...message }]);
    sendQuery(message.message);
  };

  const chatButtonHandler = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // check if thread created
    // createThread();

    // create thread if not exist

    // fetch messages
    getAllMessagesByThread();
  }, []);

  return (
    <div className="Chat">
      {!isChatOpen ? (
        <ChatWidgetButton onClickHandler={chatButtonHandler}></ChatWidgetButton>
      ) : (
        <ChatWrapper
          messages={chatMessages}
          onCloseHandler={chatButtonHandler}
          onMessageSubmit={onMessageSubmit}
        ></ChatWrapper>
      )}
    </div>
  );
}

export default Chat;
