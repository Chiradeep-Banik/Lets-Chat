import express,{ Request,Response } from 'express';
import path from 'path';
const app = express();

const public_path = path.join(__dirname,'/../public');

app.get('/css/enter_style.css',(req:Request,res:Response)=>{
    res.sendFile(path.join(public_path,'/css/enter_style.css'));
});
app.get('/js/enter.js',(req:Request,res:Response)=>{
    res.sendFile(path.join(public_path,'/js/enter.js'));
});
app.get('/',(req:Request,res:Response)=>{
    res.sendFile(path.join(public_path,'/enter.html'));
});

app.get('/me/js/chat.js',(req:Request,res:Response)=>{
    res.sendFile(path.join(public_path,'/js/chat.js'));
});
app.get('/me/css/chat_style.css',(req:Request,res:Response)=>{
    res.sendFile(path.join(public_path,'/css/chat_style.css'));
});
app.get('/me/chat',(req:Request,res:Response)=>{
    console.log(req.query.username);
    res.sendFile(path.join(public_path,'/chat.html'));
});

export default app;