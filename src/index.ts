import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server); 

const port = process.env.PORT || 1313;

io.on('connection', (socket) => {
    console.log(`From server side on connection -> ${socket.id}`);
    socket.on('send_msg', (data) => {
        console.log(`From server side on send_msg -> ${data.username}`);
        io.to(data.room).emit('send_msg',{ 
            sent_msg:data.sent_msg,
            sender_id:data.sender_id ,
            username:data.username
        });
    });
    socket.on('join_chat', (data) => {
        console.log(`From server side on join_chat -> ${data.username}`);
        socket.join(data.room);
        socket.to(data.room).emit('join_chat',{ 
            joined_user:data.username
        });
    });
    socket.on('exit_chat',(data)=>{
        console.log(`From server side on exit_chat -> ${data.username}`);
        socket.to(data.room).emit('exit_chat',{
            exited_user:data.username
        });
    });
    socket.on("disconnect", () => {
        console.log(`From server side on diss-connection -> ${socket.id}`);
    });
});


server.listen(port,async ()=>{
    console.log(`Server is listening on port https://localhost:${port}`);
});
