const form = document.querySelector('form');
const uname = document.querySelector('#uname');
const submit_btn = document.querySelector('#submit_btn');

submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (uname.value === '') {
        alert('Please enter your name');
    } else {
        form.submit();
        window.location.href = `/me/chat?username=${uname.value}`;
    }
});