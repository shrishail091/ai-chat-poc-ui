import { useRef, useEffect, useState } from "react";

function ChatDisplay({ messages }) {
  const scrollContainerRef = useRef();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const displayRef = scrollContainerRef?.current;
    if (displayRef && !isFirstLoad) {
      displayRef.scrollTop = displayRef.scrollHeight;
    }
    setIsFirstLoad(false);
  }, [messages, isFirstLoad]);

  return (
    <>
      <ul ref={scrollContainerRef} className="ChatDisplay">
        {messages.map((message, index) => (
          <li
            key={index}
            className="message-item"
            data-message-type={
              message.messageBy === "user" ? "query" : "response"
            }
          >
            <div dangerouslySetInnerHTML={{ __html: message.message }} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ChatDisplay;
