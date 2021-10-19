import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server); 
const port = process.env.PORT || 1313;

io.on('connection', (socket) => {
    console.log(`From server side on connection -> ${socket.id}`);

    socket.emit('send_msg', 'welcome');

    socket.on('send_msg', (data) => {
        console.log(`From server side on send_msg -> ${data.sent_msg}`);
        io.emit('send_msg',{ 
            sent_msg:data.sent_msg,
            sender_id:data.sender_id 
        });
    });
    socket.on("disconnect", () => {
        console.log(`From server side on diss-connection -> ${socket.id}`);
    });
});


server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
