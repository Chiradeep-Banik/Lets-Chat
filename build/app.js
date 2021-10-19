"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const public_path = path_1.default.join(__dirname, '/../public');
app.get('/css/enter_style.css', (req, res) => {
    res.sendFile(path_1.default.join(public_path, '/css/enter_style.css'));
});
app.get('/js/enter.js', (req, res) => {
    res.sendFile(path_1.default.join(public_path, '/js/enter.js'));
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(public_path, '/enter.html'));
});
app.get('/me/js/chat.js', (req, res) => {
    res.sendFile(path_1.default.join(public_path, '/js/chat.js'));
});
app.get('/me/css/chat_style.css', (req, res) => {
    res.sendFile(path_1.default.join(public_path, '/css/chat_style.css'));
});
app.get('/me/chat', (req, res) => {
    console.log(req.query.username);
    res.sendFile(path_1.default.join(public_path, '/chat.html'));
});
exports.default = app;
