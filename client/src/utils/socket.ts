import { io, Socket } from "socket.io-client";

const port: string = process.env.NODE_ENV === 'production' ? "" : ":8080"

const socketUrl: string = `${window.location.protocol}//${window.location.host}`;
const socket: Socket =  io(socketUrl);

export default socket;