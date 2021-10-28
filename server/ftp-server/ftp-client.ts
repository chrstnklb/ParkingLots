import * as Client from "ftp";
import * as fs from "fs";

import { getFilenameWithActualTimeStamp } from '../util/file'
import { ftp_server_camera_1 } from './ftp-connections'

let path: string = "app-to-cams/test.txt"

let postfix: string = "CAM"
let extensions: string = "txt"

let user: string = "test"
let password: string = "test"

let host: string = "192.168.178.20"
let port: number = 21

let test = {
    postfix: "CAM",
    extensions: "txt",
    user: "test",
    password: "test",
    host: "192.168.178.20",
    port: 21
}

/* For running this script locally for debugging purposes
sendFileToFtpServer(
    fs.readFileSync(path).toString(),
    getFilenameWithActualTimeStamp(fileNamePostfix, fileNameExtensions),
    hostName,
    port,
    userName,
    userPassword);
 */

export function send(ftp_server_camera_1) {
    sendFileToFtpServer(
        fs.readFileSync(path).toString(),
        getFilenameWithActualTimeStamp(
            ftp_server_camera_1.postfix,
            ftp_server_camera_1.extensions),
        ftp_server_camera_1.host,
        ftp_server_camera_1.port,
        ftp_server_camera_1.user,
        ftp_server_camera_1.password);
}

function sendFileToFtpServer(
    content: String,
    targetFileName: String,
    host: String,
    port: Number,
    user: String,
    password: String,
) {

    const client = new Client();
    // console.log("Start connecting to ftp server: " + host + ":" + port);
    client.on("ready", function () {
        // console.log("Connected!");
        client.put(content, targetFileName, function (err: string) {
            if (err) {
                console.log("PUT err : " + err);
            }
            console.log("Successfully wrote \t\t" + targetFileName + "\t\t to ftp server: \t\t" + host + ":" + port);
            client.end();
        });
    });

    // connect to ftp server
    client.connect({
        host: host,
        port: port,
        user: user,
        password: password,
        // debug: console.error,
    });
    //console.log(client);

}