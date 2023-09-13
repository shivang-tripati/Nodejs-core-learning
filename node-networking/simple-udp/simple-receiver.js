const dgram = require("dgram");

const receiver = dgram.createSocket("udp4");

receiver.on("message", (message, remoteInfo) => {
    console.log(
        `server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`
    );
});

receiver.bind({address: "127.0.0.1", port: 8080});

receiver.on("listening", () => {
    console.log(`server listening: `);
    console.log(receiver.address());
})