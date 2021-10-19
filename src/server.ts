import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import localtunnel from 'localtunnel';

const server = createServer(app);
const io = new Server(server); 
const port = parseInt(process.env.PORT as string) || 1313;

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


server.listen(port,async ()=>{
    console.log(`Server is listening on port https://localhost/${port}`);
    const tunnel = await localtunnel(port, {
        subdomain: 'chatapp'
    });
    console.log(`Tunnel is up and running on ${tunnel.url}`);
});
