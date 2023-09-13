const net = require("net");

const client = net.createConnection({port: 3060, host: "127.0.0.1"}, () => {

    client.write()
})