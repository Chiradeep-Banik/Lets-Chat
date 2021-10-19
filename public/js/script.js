const socket = io();
const form = document.querySelector('form');
const input = document.querySelector('#msg');
const list = document.querySelector('ul');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var msg = input.value;
    socket.emit('send_msg',{ 
        sent_msg:msg,
        sender_id:socket.id 
    });
    input.value = '';
})

socket.on("connect", () => {
    console.log(`From client side on connection -> ${socket.id}`); 
});

socket.on("send_msg", (data) => {
    console.log(`From client side on send_msg -> ${data.sender_id} ${data.sent_msg}`);
    var li = document.createElement('li');
    var id = document.createElement('span');
    var msg = document.createElement('span');
    id.innerHTML = data.sender_id+'->>>>';
    msg.innerHTML = data.sent_msg;
    li.appendChild(id);
    li.appendChild(msg);
    list.appendChild(li); 
});
  
socket.on("disconnect", () => {
    console.log(`From client side on connection -> ${socket.id}`);
});
