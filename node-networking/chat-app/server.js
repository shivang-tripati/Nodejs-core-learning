const net = require("net");

const server = net.createServer();

// an array of client sockets
const clients = [];
server.on("connection", (socket) => {
    console.log(" A new connetion to the server !")
    const clientId = clients.length + 1;
    
        // Broadcasting a message to everyone when someone join the chat room
    clients.forEach((client) => {
        client.socket.write(`User ${clientId} joined!`);

    })

    // Broadcasting a message to everyone when someone leaves the chat room
    socket.on('end', () => { 
        clients.forEach((client) => {
            client.socket.write(`User ${clientId} left!`);
        });
    })

    socket.on("data", (data) => {
        const dataString = data.toString("utf-8");
        console.log(dataString);
        const id = dataString.substring(0, dataString.indexOf("-"))
        console.log(id);
        const message = dataString.substring(dataString.indexOf("-message-") + 9);
        console.log(message);
        clients.map((client) => {
            client.socket.write(`> User ${id}: ${message}`);
        })
    });

    clients.push({id: clientId.toString(), socket});
});

server.listen(3050, "127.0.0.1", () => {
    console.log("Opened server on", server.address());
} );

