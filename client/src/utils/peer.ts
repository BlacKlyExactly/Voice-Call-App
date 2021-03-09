import Peer from "peerjs";

const port: number | string = process.env.NODE_ENV === 'production' ? window.location.port : 443;

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const peer = new Peer(customGenerationFunction(), {
    host: window.location.hostname,
    // @ts-expect-error
    port: port,
    path: "/rtc",
    debug: 1,
});

export default peer;