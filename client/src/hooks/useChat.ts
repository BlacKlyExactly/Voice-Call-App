import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { Connection, getUserRoom } from "../utils/room";

export interface MsgData { 
    name: string, 
    message: string,
    roomId?: string
};

export interface MsgList {
    roomId: string,
    messages: MsgData[]
}

const useChat = () => {
    const [ lastMessage, setLastMessage ] = useState<MsgData>();

    useEffect(() => {
        socket.on("messageSent", ({ name, message, roomId }: MsgData ) => setLastMessage({ name, message, roomId }));
    }, [ ])

    const sendMessage = async ({ name, message }: MsgData ) => {
        const userRoom: Connection | undefined = await getUserRoom();
        userRoom && 
            socket.emit("sendMessage", { name, message, roomId: userRoom.room });
    }

    return { sendMessage, lastMessage };
}

export default useChat;