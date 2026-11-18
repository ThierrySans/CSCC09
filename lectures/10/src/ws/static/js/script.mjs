const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

const form = document.querySelector('.form');

form.onsubmit = function() {
    const input = document.querySelector('.input'); 
    const text = input.value;
    ws.send(text);
    input.value = '';
    input.focus();
    return false;
}

ws.onmessage = function(msg) {
    const response = msg.data;
    const messageList = document.querySelector('.messages');
    const li = document.createElement('li');
    li.textContent = response;
    messageList.appendChild(li);
}