import { useState, useEffect } from "react";
import peer from "../utils/peer";
import socket from "../utils/socket";
import Swal from "sweetalert2";
import { Connection, getConnections, getUserRoom, Name } from "../utils/room";
import Peer from "peerjs";

const nameMissing = () => Swal.fire({
    title: `What's your name ?`,
    text: "Pss... You need to fill name input with your name!",
    icon: "error"
})

const idMissing = () => Swal.fire({
    title: "Ooops! You forgot to set room id!",
    text: "Mamma Mia! 🍕 🍝",
    icon: "error"
})

const idLengthToSmall = () => Swal.fire({
    title: "Room id length is too small 😒",
    text: "Ah shit, here we go again.",
    icon: "error"
})

const roomIsNotExist = ( id: string ) => Swal.fire({
    title: `Room: ${id} is not existing 😢`,
    text: "Maybe it's typo.",
    icon: "error"
})

const roomIsAlreadyExist = () => Swal.fire({
    title: "Room is already exist! 😫",
    text: "Oh! No!",
    icon: "error"
})

const nameAlreadyExist = () => Swal.fire({
    title: "Ahhh! Your name is already taken in this room 😫",
    text: "Change it and try again.",
    icon: "error"
});

const useRtc = ( onUpdateRoom?: ( userConnection: Connection | undefined ) => void ) => {
    const call = async ( connection: Connection ) => {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        connection.peers.forEach(( peerClient: Name ) => {
            if(peerClient?.id !== peer?.id) {
                const call = peer.call(peerClient.id, stream);
                call.on('stream', () => playAudio(stream));
            }
        })
    }

    const playAudio = ( stream: MediaStream ) => {
        const audio: HTMLAudioElement | null = document.querySelector("audio");

        if(audio){
            audio.srcObject = stream;
            audio.play();
        }
    }

    useEffect(() => {
        socket.on("onJoinToRoom", async ( connection: Connection ) => {
            call(connection);

            if(onUpdateRoom){
                const userConnection: Connection | undefined = await getUserRoom();
                onUpdateRoom(userConnection);
            }
        })

        socket.on("leftFromRoom", async ({ id, peer }: { id: string, peer: Name }) => {
            if(onUpdateRoom){
                const userConnection: Connection | undefined = await getUserRoom();
                onUpdateRoom(userConnection);
            }
        })

        peer.on("call", async ( call: Peer.MediaConnection ) => {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            call.answer(stream);
            call.on("stream", () => playAudio(stream));
        })        
    }, [ ])
    

    const connectToRoom = async ( id: string, name: string | undefined ) => {
        if(!name){
            nameMissing();
            return;
        }

        if(id.length < 5){
            idLengthToSmall();
            return;
        }

        const { connections } = await getConnections();

        if(!connections.find(( conn: Connection ) => conn.room === id)){
            roomIsNotExist(id);
            return;
        }
        
        if(connections.find(( conn: Connection ) => conn.peers.find(( peerName: Name ) => peerName?.name === name))){
            nameAlreadyExist();
            return;
        }       

        socket.emit("joinToRoom", { id, peer: peer.id, name, color: `#${Math.floor(Math.random()*16777215).toString(16)}` });
    }

    const leaveFromRoom = async () => {
        const userConnection: Connection | undefined = await getUserRoom();

        userConnection &&
            socket.emit("leaveFromRoom", { id: userConnection.room, peer: peer.id });
    };

    const createRoom = ( id: string, name: string | undefined ) => {
        return new Promise(async ( resolve, reject ) => {
            const { connections } = await getConnections();

            if(!name){
                nameMissing();
                reject();
                return;
            }

            if(!id){
                idMissing();
                reject();
                return;
            }

            if(id.length < 5){
                idLengthToSmall();
                reject();
                return;
            }

            if(connections.find(( conn: Connection ) => conn.room === id)){
                roomIsAlreadyExist();
                reject();
                return;
            }

            socket.emit("createRoom", { id, peer: peer.id });
            resolve({ id, peer: peer.id });
        })
    }

    return { connectToRoom, leaveFromRoom, createRoom }
}

export default useRtc;