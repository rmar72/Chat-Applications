const socket = new WebSocket('ws://localhost:8080');

const user = document.querySelector('#username');
const msg = document.querySelector('#msg');
const btn = document.querySelector('button');

const chatWindow = document.querySelector('#winchat');
const msgList = document.querySelector('#msg-list');


//console.log(EventTarget.prototype.isPrototypeOf(socket) ) // true

// promptly sends a hello to server
// socket.addEventListener('open', () => { 
//   socket.send('hey hello!');
// });

// send message from input
function sendMsg(){
  socket.send( JSON.stringify({user: user.value, msg: msg.value}) );
}

btn.addEventListener('click', ()=>{
  sendMsg(socket, user, msg);
});

// receive msg from server
socket.addEventListener('message', ({data}) => {
  const content = JSON.parse(data);
  const listItem = document.createElement('LI');
  
  listItem.innerHTML = `<h4>${content.user}</h4> - <p>${content.msg}</p>`;
  msgList.appendChild(listItem);

  msg.value = ''; // clear input
  updateScroll();
});

// see bottom comments behavior
function updateScroll(){
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


