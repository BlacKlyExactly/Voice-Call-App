import { io, Socket } from "socket.io-client";

const port: string = process.env.PORT || "8080";

const socketUrl: string = `http://localhost:${port}`;
const socket: Socket =  io(socketUrl);

export default socket;