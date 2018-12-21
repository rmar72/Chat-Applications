const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = new WebSocket.Server({ server: app.listen(8080) });

server.on('connection', (socket, req) => {
  console.log('socket listening on port 8080');
  //console.log("client's ip: ", req.connection.remoteAddress); // client's ip address

  // initial hello from server
  socket.send(JSON.stringify({user: "serverbot" , msg:"Greetings fellow space headz"}));

  socket.on('message', (content) => {
    const data = JSON.parse(content);

    // clients array for keeping track of browsers connected to ws
    server.clients.forEach(client => {
      client.send(JSON.stringify(data)); // send each client data
    });
  });

});