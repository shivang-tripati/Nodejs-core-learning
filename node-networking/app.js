const http = require("http");
 const port = 4080;
 const hostnmae = "192.168.189.122";

 const server = http.createServer((req,res) => {
    const data = {message: "hii, there!"};

    res.setHeader("content-Type", "application/json");
    res.setHeader("conection", "close");
    res.statusCode = 200;
    res.end(JSON.stringify(data));

 });

 server.listen(port, hostnmae, () => {
    console.log(`server runing on port http://${hostnmae}:${port}`);
 })