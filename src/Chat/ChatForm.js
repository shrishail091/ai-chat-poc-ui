import { useState } from "react";
import SendIcon from "./Icons/SendIcon";

function ChatForm({onMessageSubmit}){
    const [inputValue, setInputValue] = useState("");

    const onInputChange = (e)=>{
        setInputValue(e.target.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        onMessageSubmit({
            message:inputValue,
            messageBy: "user",
        });
        setInputValue("");
    }
    return (
        <form>
            <div className="input-controller">
                <input placeholder="Ask anything" className="input" type="text" value={inputValue} name="message" onChange={onInputChange}></input>
                <button className="submit-btn" onClick={onSubmit} aria-disabled={!inputValue.length} disabled={!inputValue.length}><SendIcon></SendIcon></button>
            </div>
        </form>
    )
}

export default ChatForm;