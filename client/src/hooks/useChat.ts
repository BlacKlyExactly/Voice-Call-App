import { useEffect } from "react";
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

const useChat = ( onMessageSent: ( data: MsgData ) => void ) => {
    useEffect(() => {
        socket.on("messageSent", ({ name, message, roomId }: MsgData ) => onMessageSent({ name, message, roomId }));
    }, [ ])

    const sendMessage = async ({ name, message }: MsgData ) => {
        const userRoom: Connection | undefined = await getUserRoom();
        userRoom && 
            socket.emit("sendMessage", { name, message, roomId: userRoom.room });
    }

    return { sendMessage };
}

export default useChat;