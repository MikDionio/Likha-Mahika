var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};
var roomCount = 0;
var nextRoom = 0;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){//when a new player connects

    if(roomCount == 0){//if no rooms, make new room
        console.log("No rooms");
        socket.join('room'+roomCount);
        newPlayer(socket, roomCount);
        console.log(socket.id + ' has joined session ' + roomCount);
        roomCount++;
    }else{
        // for(i = 0; i < roomCount; i++){
        //     if(!io.sockets.adapter.rooms['room'+i]){//If room does not exist, fill in gap
        //         socket.join('room'+i);
        //         newPlayer(socket, i);
        //         console.log(socket.id + ' has joined session ' + i);
        //         break;
        //         // console.log("Room " + i + " does not exist");
        //     } else if(io.sockets.adapter.rooms['room'+i].length < 2){//If found room with 1 player, add player and send waiting player data to new player
        //         console.log("Old Room");
        //         socket.join('room'+i);
        //         newPlayer(socket, i);
        //         console.log(socket.id + ' has joined session ' + i);
        //         roomCount++;
        //         break;
        //     } else if(i == roomCount - 1){//If found no room with 1 player, create new room
        //         console.log("New Room");
        //         socket.join('room'+roomCount);
        //         newPlayer(socket, roomCount);
        //         console.log(socket.id + ' has joined session ' + roomCount);
        //         // roomCount++;
        //         break;
        //     }
        // }
        var foundRoom = false;
        for(i = 0; i < roomCount; i++){//Look for room with waiting user
            if(io.sockets.adapter.rooms['room'+i]){//If room exists
                if(io.sockets.adapter.rooms['room'+i].length < 2){//check if it waiting user
                    socket.join('room'+i);
                    newPlayer(socket, i);
                    console.log(socket.id + ' has joined session ' + i);
                    foundRoom = true;
                    break;
                }
            }
        }
        if(!foundRoom){//If no room with waiting user
            for(i = 0; i < roomCount; i++){
                if(!io.sockets.adapter.rooms['room'+i]){//If room does not exist, fill in gap
                    socket.join('room'+i);
                    newPlayer(socket, i);
                    console.log(socket.id + ' has joined session ' + i);
                    break;
                    // console.log("Room " + i + " does not exist");
                }else if(i == roomCount - 1){
                    console.log("New Room");
                    socket.join('room'+roomCount);
                    newPlayer(socket, roomCount);
                    console.log(socket.id + ' has joined session ' + roomCount);
                    roomCount++;
                    break;
                }
            }
        }
    }
    // roomCount = roomCount % 128;

    socket.on('disconnect', function() {
        console.log('user disconnected');
        //remove this player from our players object
        delete players[socket.id];

        //emit a message to all players to remove this player
        io.emit('disconnect',socket.id);
    });

    socket.on('playerInput', function(projectileData){
        //console.log(projectileData.roomId);
        socket.broadcast.to(projectileData.roomId).emit('playerClicked',projectileData);
    });
});

server.listen(8081, function() {
    console.log(`Listening on ${server.address().port}`);
});

function newPlayer(socket, roomNo){//Create new player
    //create a new player and add it to our players object
    room = 'room' + roomNo;
    players[socket.id] = {
        playerId: socket.id,
        roomId: room,
    };

    console.log("Player " + players[socket.id].playerId + " broadcasting to " + players[socket.id].roomId);
    io.in(room).emit('currentPlayers', players[socket.id]);//send to room a new player's data

    io.of('/').in(room).clients((error, clients) => {//get list of clients in a room
        if(clients[0]){//if room is occupied
            io.in(room).emit('currentPlayers', players[clients[0]]);//retransmit data of player already in the room
        }
    })
}