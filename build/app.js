"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// app.use('public',express.static(path.join(__dirname+'public')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/public/index.html'));
});
exports.default = app;
