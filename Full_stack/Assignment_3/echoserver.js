const net = require('net'); // this is for handling the TCP connections

net.createServer(function(socket) {
    // We create a server and welcome any connected user
    socket.write("Welcome new user!\n");
    // echo messages back to user
    socket.pipe(socket);
}).listen(3000);

console.log("The server has been started");
console.log("Connect the server with telnet: 'telnet localhost 3000'");

