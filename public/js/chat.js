const socket = io();
const form = document.querySelector('form');
const input = document.querySelector('#msg');
const list = document.querySelector('ul');
const params = new URLSearchParams(window.location.search);
const exit_btn = document.querySelector('#exit');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var msg = input.value;
    if(msg == '') return;
    socket.emit('send_msg',{ 
        sent_msg:msg,
        sender_id:socket.id,
        username:params.get('username') 
    });
    input.value = '';
});

exit_btn.addEventListener('click', () => {
    socket.emit('exit_chat',{
        sender_id:socket.id,
        username:params.get('username')
    });
    window.location.href = '/';
});

socket.on("connect", () => {
    console.log(`From client side on connection -> ${socket.id}`); 
});

socket.on("send_msg", (data) => {
    console.log(`From client side on send_msg -> ${data.sender_id} ${data.sent_msg}`);
    var li = document.createElement('li');
    li.innerHTML = `
        <li>
            <span class="id">${data.sender_id}====</span>
            <span class="user">${data.username}=====</span>
            <span class="msg">${data.sent_msg}</span>
        </li>
    `;
    list.appendChild(li); 
});
  
socket.on("disconnect", () => {
    console.log(`From client side on connection -> ${params.get('username')}`);
});

socket.on("exit_chat", (data) => {
    var li = document.createElement('li');
    li.innerHTML = `
        <li>
            <span class="msg">${data.exited_user} has left the chat</span>
        </li>
    `;
    list.appendChild(li); 
});