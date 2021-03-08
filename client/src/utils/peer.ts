import Peer from "peerjs";

const port: string = process.env.NODE_ENV === 'production' ? "" : "8080"

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const peer = new Peer(customGenerationFunction(), {
    host: window.location.hostname,
    port: port !== "" ? parseInt(port) : 80,
    path: "/rtc",
    debug: 1,
});

export default peer;