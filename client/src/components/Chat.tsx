import React, { FC, useState, FormEvent, ChangeEvent, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { room } from "../assets/colors";
import ChatMessage from "./ChatMessage";
import useChat, { MsgData, MsgList } from "../hooks/useChat";
import { AppContext } from "../App";
import { Connection, getUserRoom } from "../utils/room";

const ChatArea = styled.div`
    display: none;
    width: 100%;
    height: 100%;
    background: ${room.darker};
    position: absolute;
    display: grid;
    overflow: hidden;
    grid-template-rows: 1.5fr 0.325fr;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    height: 85%;
    padding: 20px;

    @media screen and (min-width: 800px){
       position: relative;
       width: 25%;
       height: 100%;
       padding: .5vw;
    }
`;

const ChatActions = styled.form`
    width: 80%;
    display: flex;
    align-items: center;
`;

const ChatInput = styled.input`
    height: 50px;
    width: 80%;
    background: ${room.light};
    border: none;
    color: white;
    padding: 10px;
    border-radius: 10px;

    @media screen and (min-width: 800px){
        height: 40%;
        width: 70%;
        padding: 1vw;
    }
`;

const ChatSubmit = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-left: 1vw;
    background: ${room.blue};
    color: white;
    padding: 1vw;
    border: none;
    border-radius: 10px;
    height: 50px;
    width: 40%;
    display: flex;
    align-items: center;

    @media screen and (min-width: 800px){
        height: 40%;
        width: 20%;
    }
`;

const ChatMessages = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
`;

const Chat: FC = () => {
    const [ messages, setMessages ] = useState<MsgData[]>([ ]);
    const [ message, setMessage ] = useState<string>("");

    const { name, userRoom } = useContext(AppContext);

    const chatMsgs = useRef<HTMLDivElement>(null);

    const { sendMessage } = useChat(({ name, message, roomId }) => {
        setMessages(( prev: MsgData[] ) => [ ...prev, { name, message, roomId } ]);
        chatMsgs.current && chatMsgs.current.scrollTo(0,document.body.scrollHeight);
    });

    useEffect(() => {
        const fetchMessages = async () => {
            const userRoom: Connection | undefined = await getUserRoom();
            if(!userRoom) return;

            const msgList: MsgList = await (await fetch(`/api/chat/${userRoom?.room}`)).json();
            setMessages(msgList.messages);
        }

        fetchMessages();
    }, [ userRoom ])

    const handleSubmit = async ( e: FormEvent ) => {
        e.preventDefault();
        if(name && message.trim().length > 0){
            sendMessage({ name, message });
            setMessage("");
        }
    }

    const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    return(
        <ChatArea data-testid="chat">
            <ChatMessages ref={chatMsgs} data-testid="messages">
                {messages.map(({ name, message }: MsgData, index: number ) => (
                        <ChatMessage 
                            username={name} 
                            message={message}
                            key={index}
                        />
                ))}
            </ChatMessages>
            <ChatActions onSubmit={handleSubmit}>
                <ChatInput 
                    placeholder="Send your message..."
                    onChange={handleInputChange}
                    value={message}
                />
                <ChatSubmit type="submit">Send</ChatSubmit>
            </ChatActions>
        </ChatArea>
    )
}

export default Chat;