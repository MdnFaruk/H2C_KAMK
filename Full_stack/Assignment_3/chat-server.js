"use strict";

const net = require('net');

// Init an array to handle the incoming connections
var connections = [];

net.createServer(function(socket) {
    // Set character encoding to UTF-8
    socket.setEncoding('utf8');

    // Apply a bit of randomness to usernames
    socket.nick = "user" + (Math.random()*10000).toFixed();
    // Print incoming connections to server console 
    console.log("user", socket.nick, "connected");
                                   
    // Say hello to connected user (send to client)
    socket.write("Welcome: " + socket.nick + "\r\n");
                                   
    // Add incoming user to connections array
    connections.push(socket);

    socket.on('data', function(buffer) {
        console.log("received data", buffer);
        
        var command = buffer.toString().trim().split(" ");
        switch(command[0]) {
            case 'HELP':
                socket.write("Commands are: HELP, NICK, MSG, WHOIS, USERS" + "\r\n");
                break;

            case 'NICK':
                this.nick = command[1];
                socket.write("You are now known as: " + this.nick + "\r\n");
                break;

            case 'MSG':
                connections.forEach(function(node){
                    if(node.nick == command[1]) {
                        node.write(socket.nick + " says: " + command.slice(2).join(" ") + "\r\n");
                    }
                });
                break;

            case 'WHOIS':
                connections.forEach(function(node){
                    if(node.nick == command[1]){
                        socket.write("WHOIS: known as " + node.nick + " " + JSON.stringify(node.address()) + "\r\n" );
                    } 
                });
                break;
            
            case 'USERS':
                var users = [];
                connections.forEach(function(socket){
                    users.push(socket.nick)
                });
                socket.write(JSON.stringify(users) + "\r\n");
                break;


            default:
                console.log("command", command[0], "not implemented");
                break;
        }
    });

    socket.on('close', function() {
        console.log(socket.nick, "disconnected");
        connections = connections.filter((node) => {
            return node.nick != socket.nick;
        });
    });
}).listen(3000);

console.log("The server has been started");
console.log("Connect the server with telnet: 'telnet localhost 3000'");