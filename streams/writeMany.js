// const fs = require('node:fs/promises');

// ( async () => {
//     console.time("writeMany")
//     const fileHandle = await fs.open("text.txt", "w")

//     for (let i = 0; i < 1000000; i++) {
//         fileHandle.write(`${i} `);
        
//     }
//     console.timeEnd("writeMany")
// })();

// const fs = require("node:fs");

// ( async () => {
//     console.time("writeMany")
//     fs.open("text.txt", "w", (err, fd) => {
//         for (let i = 0; i < 1000000; i++) {
//             fs.writeSync(fd, `${i} `);
//         }
//         console.timeEnd("writeMany");
//     })  
// })();



//  ** don't practice it, 
const fs = require("node:fs/promises");

( async () => {
    console.time("writeMany")
    const fileHandle = await fs.open("text.txt", "w");
    const stream  = fileHandle.createWriteStream();
        for (let i = 0; i < 1000000; i++) {
            const buff = Buffer.from(`${i} `, "utf-8")
            stream.write(buff);
        }
        console.timeEnd("writeMany");
    })();