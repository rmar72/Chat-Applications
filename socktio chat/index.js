const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html') );

io.on('connection', socket => {
    socket.on('chat message', data => io.emit('chat message', data) );
    socket.on('disconnect', ()=>{});
});

http.listen(port, () => console.log('listening on *:'+ port) );