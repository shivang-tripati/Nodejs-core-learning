// a unit of device is a file

//  ****promise api****
// in most of cases
const fs = require('fs/promises');

(async () => {
    try {
        await false.copyFile("file.txt", "copies-promise.txt");
    } catch (error) {
        console.log(error);
    }
})();


// ****Call-Back API******
// faster than promis e
//in case of performance is more critical to you
const fs = require("fs");

fs.copyFile("file.txt", "copied-callback.txt", (error) => {
    if (error) {
        console.log(error);
    }
});

// ****** Synchronous Api *********
// only use when u damn sure!, that you have to

const fs = require("fs");
fs.copyFileSync("file.txt", "copied-sync.txt");