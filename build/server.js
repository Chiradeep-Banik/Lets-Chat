"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const localtunnel_1 = __importDefault(require("localtunnel"));
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server);
const port = 1313;
io.on('connection', (socket) => {
    console.log(`From server side on connection -> ${socket.id}`);
    socket.on('send_msg', (data) => {
        console.log(`From server side on send_msg -> ${data.sent_msg}`);
        io.emit('send_msg', {
            sent_msg: data.sent_msg,
            sender_id: data.sender_id,
            username: data.username
        });
    });
    socket.on('join_chat', (data) => {
        console.log(`From server side on join_chat -> ${data.username}`);
        socket.broadcast.emit('join_chat', {
            joined_user: data.username
        });
    });
    socket.on('exit_chat', (data) => {
        console.log(`From server side on exit_chat -> ${data.username}`);
        socket.broadcast.emit('exit_chat', {
            exited_user: data.username
        });
    });
    socket.on("disconnect", () => {
        console.log(`From server side on diss-connection -> ${socket.id}`);
    });
});
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is listening on port https://localhost/${port}`);
    const tunnel = yield (0, localtunnel_1.default)(port, {
        subdomain: 'chatapp'
    });
    console.log(`Tunnel is up and running on ${tunnel.url}`);
}));
