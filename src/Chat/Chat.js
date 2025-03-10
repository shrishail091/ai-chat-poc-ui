import { useEffect, useState } from "react";
import ChatWidgetButton from "./ChatWidgetButton";
import ChatWrapper from "./ChatWrapper";
import "./chat.css";

const ChatThread = {
  userId: 2,
  threadName: "Neom Chat Widget POC",
  appId: 2,
  threadId: localStorage.getItem("threadId") || 101,
};

const BaseUrl = "http://localhost:8080/v1";
const CreateThreadUrl = `${BaseUrl}/chat-thread/chatThreads`;
const ChatsByThread = `${BaseUrl}/chat/history/${ChatThread.threadId}?limit=50`;
const SendMessageUrl = `${BaseUrl}/chat/langchain/query-over-data`;

function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [isAiResponding, setIsAiResponding] = useState(false);

  async function createThread(ThreadConfig = ChatThread) {
    fetch(CreateThreadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: ThreadConfig.userId,
        threadName: ThreadConfig.threadName,
        appId: ThreadConfig.appId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("threadId", data.id);
        setChatMessages([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
    setIsAiResponding(true);
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
      })
      .finally(()=>{
        setIsAiResponding(false);
      });
  }

  const onMessageSubmit = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, { ...message }]);
    sendQuery(message.message);
  };

  const chatButtonHandler = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const createNewThread = () => {
    const id = Math.round(Math.random() * 100);

    const threadConfig = {
      userId: ChatThread.userId,
      threadName: `Neom Chat Widget POC - ${id}`,
      appId: ChatThread.appId,
    };

    createThread(threadConfig);
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
          onCreateNewThread={createNewThread}
          isAiResponding={isAiResponding}
        ></ChatWrapper>
      )}
    </div>
  );
}

export default Chat;
