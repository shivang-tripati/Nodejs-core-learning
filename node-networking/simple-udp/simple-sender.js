const dgram = require("dgram");

const sender = dgram.createSocket({type:"udp4", sendBufferSize: 2000}); //max Size: 9216 bytes

sender.send("This is a String ", 8080, "127.0.0.1", (error, bytes) => {
    if(error) console.log(error);
    console.log(bytes);
})