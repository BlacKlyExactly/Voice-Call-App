import Peer from "peerjs";

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const peer = new Peer(customGenerationFunction(), {
    host: "localhost",
    port: 8081,
    path: "/rtc",
    debug: 1,
});

export default peer;