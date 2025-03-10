import ChatDisplay from "./ChatDisplay";
import ChatForm from "./ChatForm";
import CloseIcon from "./Icons/CloseIcon";

function ChatWrapper({messages, onCloseHandler, onMessageSubmit}){
    return (
        <div className="ChatWrapper">
            <header className="chat-header">
                <div className="chat-header-content">
                    <h3>Neom Chat POC</h3>
                    <button class="close-btn" onClick={onCloseHandler}><CloseIcon></CloseIcon></button>
                </div>
            </header>
            <ChatDisplay messages={messages}></ChatDisplay>
            <ChatForm onMessageSubmit={onMessageSubmit}></ChatForm>
        </div>
    )
}

export default ChatWrapper;