const FtpSvr = require("ftp-srv");

const hostname = "0.0.0.0";
const port = 5056;

const ftpServer = new FtpSvr({
    url: "ftp://" + hostname + ":" + port,
    pasv_url: "ftp://172.18.56.71",
    pasv_min: 5054,
    pasv_max: 5055,
    file_format: "ls",
    anonymous: true,
    greeting: ["Hello user"],
});

ftpServer.on("login", (data, resolve, reject) => {
    if ((data.username === "anonymous") || (data.username === "admin" && data.password === "admin")) {
        console.log("Successful login of " + data.username);
        console.log("resolve");
        return resolve({ root: "server\outgoing-files\ftp-server" });
    } else {
        console.log("reject");
        reject({});
    }
});

ftpServer.listen().then(() => {
    console.log(`Server Running at ftp://${hostname}:${port}/`);
});
