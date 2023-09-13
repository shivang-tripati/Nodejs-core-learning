const net  = require("net");
const fs = require("node:fs/promises");
const path = require("path");

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

const socket = net.createConnection({host: "::1", port: 5050}, async () => {

    const filePath = process.argv[2];
    const fileName = path.basename(filePath);
    const fileHandle = await fs.open(filePath, "r");
    const fileReadStream = fileHandle.createReadStream(); // the stream to read it
    const fileSize = (await fileHandle.stat()).size;

    // for showing the upload progress
    let uploadedPercentage = 0;
    let bytesuploded = 0;

    socket.write(`fileName: ${fileName}-----`)

    console.log(); // to get anice log for the uploading progress percentage of file

    // reading from source file 
    fileReadStream.on("data", async (data) => {
        if(!socket.write(data)) {
            fileReadStream.pause();
        }

        bytesuploded += data.length; 
        let newPercentage = Math.floor((bytesuploded / fileSize) * 100);

        if(newPercentage % 5 == 0 && newPercentage != uploadedPercentage) {
            uploadedPercentage = newPercentage;
            await moveCursor(0, -1);
            await clearLine(0);
           
            console.log(`Uploading... ${uploadedPercentage}%`);
        }
    })

    socket.on ("drain", () => {   // you don't have drain event for readable stram
                                 // this drain event will kick in after our internal buffer is emptied
        fileReadStream.resume();
    })

    fileReadStream.on("end", () => {
        console.log("file Uploaded Successfully")
        socket.end(); // this end event ends dupleax(writeable & readable) streams 
    })
})