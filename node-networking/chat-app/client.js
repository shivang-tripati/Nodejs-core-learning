const { Console } = require("console");
const { promises } = require("dns");
const { read } = require("fs");
const net = require("net");
const { resolve } = require("path");

const readline = require("readline/promises");

const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout
})

const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve();
        });;
    })
    
}

const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve();
        })
    });
}

let id;
const socket = net.createConnection({host: "127.0.0.1", port: 3050}, 
async () => {
    console.log("Connected to the Server !");

    const ask = async () => {
        const message = await rl.question("Enter a message > ")
        //move cursor one line up
        await moveCursor(0, -1);

        // clear the current line that the cursor is in
        await clearLine(0);
        socket.write(`${id}-message-${message}`);
    
    }

    ask();

    socket.on("data", async (data) => {
        //log an empty line
         console.log();
         // move the cursor onr line up
         await moveCursor(0, -1);
         // clear that line that cursor just moved into
         await clearLine(0);

          if(data.toString("utf-8").substring(0, 2) === "id") {
            // when we are getting the id..
            id = data.toString("utf-8").substring(3); //everything from the 3rd character up untill the end

            console.log(`your id is ${id}\n`)

         } else {
            // when we are getting message.....
            console.log(data.toString("utf-8"));
         }
        
    
        ask();
    });



    socket.on("end", () => {
        console.log("Connection was ended!")
    })
    
});


