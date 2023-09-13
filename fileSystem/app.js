const fs = require("fs/promises");

//open() file descriptor ;- a no. that assign to a open file
( async () => {

    const fileHandler = await fs.open("./command.txt", "r");
    const watcher = fs.watch("./command.txt");
    console.log("hiii")
    for await (const event of watcher) {
        if(event.eventType === "change") {
            // this file was changed
            console.log("The file was Changed.......");

            const content = await fileHandler.read(Buffer.alloc(11));
            console.log(content);
        }
    }
})();