const net = require("net");

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        console.log(data);
    });
});

server.listen(3050, "127.0.0.1", () => {
    console.log("opened server on", server.address());
})