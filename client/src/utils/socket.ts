import { io, Socket } from "socket.io-client";

const socketUrl: string = "http://localhost:8080/";
const socket: Socket =  io(socketUrl);

export default socket;