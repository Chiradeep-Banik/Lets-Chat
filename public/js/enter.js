const form = document.querySelector('form');
const uname = document.querySelector('#uname');
const room = document.querySelector('#room');
const submit_btn = document.querySelector('#submit_btn');

submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (uname.value === '' || room.value === '') {
        alert('Please enter your name');
    } else {
        form.submit();
        window.location.href = `/me/chat?username=${uname.value}&room=${room.value}`;
    }
});