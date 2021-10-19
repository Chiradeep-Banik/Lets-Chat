import express,{ Request,Response } from 'express';
import path from 'path';
const app = express();

const public_path = path.join(__dirname+'/../public');

app.use(express.static(public_path));

export default app;