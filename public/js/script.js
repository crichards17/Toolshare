const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { getHeapSpaceStatistics } = require('v8');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
  


$(document).ready(function() {
 
    $("#owl-demo").owlCarousel({
   
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
   
        // "singleItem:true" is a shortcut for:
        // items : 1, 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
   
    });
   
  }); 
  // $(window).unload(async function () { 
  //   // $.get('/session/destroy');
  //   const response = await fetch('/api/UsersLogin/logout', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // });

  const logout = async () => {
    console.log('out')
    const response = await fetch('/api/UsersLogin/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/api/UsersLogin/login');
    } else {
      alert(response.statusText);
    }};
    const test=()=>console.log('tetrerer')
    $(window).onload(test())