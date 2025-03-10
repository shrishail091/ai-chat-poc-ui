import SendIcon from "./Icons/SendIcon";

function ChatWidgetButton({onClickHandler}){
    return <button className="ChatWidgetButton" onClick={onClickHandler}><SendIcon></SendIcon></button>
}

export default ChatWidgetButton;