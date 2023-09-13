const net = require("net")
const fs = require("node:fs/promises")

const server = net.createServer(() => {});

//socket objects refers to end point, we could've 100 or millions of clients all have seprate socket object
// we could read rom this end point or we can write to this end point
server.on("connection", (socket) => {
    console.log("New Connection");

    let fileHandle, fileWriteStream;


    // we read from socket using "data" events, the parameter data is a buffer,
    socket.on("data", async (data) => {
        if(!fileHandle) {
             socket.pause(); // pause receiving data form the client 

             const indexOfDivider = data.indexOf("-----");
             const fileName = data.subarray(10, indexOfDivider).toString("utf-8");



             fileHandle = await fs.open(`storage/${fileName}`, "w");
             fileWriteStream = fileHandle.createWriteStream(); // the stream to write to

             // writing to destination file
             fileWriteStream.write(data.subarray(indexOfDivider + 5 ));

             socket.resume();  // resume receiving data from the client                       
             fileWriteStream.on("drain", () => {  // You only drain when you're writing
                socket.resume();        // this drain event will kick in after our internal buffer is emptied 
                                       // and now we are safe to write again to the stream.
                                      // stream is not actually a data structure, it's extract interface around buffer. i.e. buffer is the Data Structure 
            })   
        } else {
           if(!fileWriteStream.write(data)) {
            socket.pause();
           }
        }
         

    })


    // this end event happen when client.js file ends the socket
    socket.on("end", () => { // this end event end only readable stream socket as socket is only dealing with readable side here
        fileHandle.close();
        fileHandle = undefined;
        fileWriteStream = undefined;
        console.log("connection ended!");
    })

});

server.listen(5050, "::1", () => {
    console.log("uplaoder server opened on ", server.address());
})
