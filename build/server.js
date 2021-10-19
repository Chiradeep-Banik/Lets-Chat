"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server);
const port = process.env.PORT || 1313;
io.on('connection', (socket) => {
    console.log(`From server side on connection -> ${socket.id}`);
    socket.emit('send_msg', 'welcome');
    socket.on('send_msg', (data) => {
        console.log(`From server side on send_msg -> ${data.sent_msg}`);
        io.emit('send_msg', {
            sent_msg: data.sent_msg,
            sender_id: data.sender_id
        });
    });
    socket.on("disconnect", () => {
        console.log(`From server side on diss-connection -> ${socket.id}`);
    });
});
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
