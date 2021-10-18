import express,{ Request,Response } from 'express';
import path from 'path';
const app = express();

// app.use('public',express.static(path.join(__dirname+'public')));

app.get('/', (req:Request, res:Response):void => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

export default app;