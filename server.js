var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};
var roomCount = 0;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){//when a new player connects

    if(roomCount == 0){//if no rooms, make new room
        socket.join('room'+roomCount);
        newPlayer(socket, roomCount);
        console.log(socket.id + ' has joined session ' + roomCount);
        roomCount++;
    }else{
        for(i = 0; i < roomCount; i++){
            if(!io.sockets.adapter.rooms['room'+i]){//If room does not exist, fill in the gap
                socket.join('room'+i);
                newPlayer(socket, i);
                console.log(socket.id + ' has joined session ' + i);
                break;
            } else if(io.sockets.adapter.rooms['room'+i].length < 2){//If found room with 1 player, add player
                socket.join('room'+i);
                newPlayer(socket, i);
                console.log(socket.id + ' has joined session ' + i);
                break;
            } else if(i == roomCount - 1){//If found no room with 1 player, create new room
                socket.join('room'+roomCount);
                newPlayer(socket, roomCount);
                console.log(socket.id + ' has joined session ' + roomCount);
                roomCount++;
                break;
            }
        }

    }

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

function newPlayer(socket, roomNo){
    //create a new player and add it to our players object
    players[socket.id] = {
        playerId: socket.id,
        roomId: 'room' + roomNo,
    };

    //send the players object to the new player
    socket.emit('currentPlayers', players);

    //update all other players of the new player
    socket.broadcast.emit('newPlayer',players[socket.id]);
}