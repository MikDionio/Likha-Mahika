//THIS PART IS FOR AUTH
// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/main');
const secureRoutes = require('./routes/secure');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// create an instance of an express app
const app = express();

//
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
var players = {};
var roomCount = 0;

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
 
// require passport auth
require('./auth/auth');
app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
    res.sendFile(__dirname + '/public/game.html');
  });

app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// main routes
app.use('', routes);
app.use('', passport.authenticate('jwt', { session : false }), secureRoutes);

// catch all other routes that don't have a page (404)
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: '404 - Not Found' });
});

// handle more complicated errors (500) 
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error : err });
});

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});

// For checking available routes
//var route, routes2 = [];
// app._router.stack.forEach(function(middleware){
//     if(middleware.route){ // routes registered directly on the app
//         routes2.push(middleware.route);
//     } else if(middleware.name === 'router'){ // router middleware 
//         middleware.handle.stack.forEach(function(handler){
//             route = handler.route;
//             route && routes2.push(route);
//         });
//     }
// });
// console.log(routes2)

// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});

//THIS PART IS FOR THE SERVER
//Actions when a new player connects
io.on('connection', function(socket){
  
  socket.on('connectPlayer', function(playerData){

    //If no rooms, make first room
    //Else, try to find a room with waiting user
    //Else, make new room
    if(roomCount == 0){
      console.log("No rooms");
      joinRoom(socket, playerData, 'room' + roomCount);
      roomCount++;
    }else{
        var foundRoom = false;
        for(i = 0; i < roomCount; i++){
            //If room exists and has 1 user waiting, join room
            if(io.sockets.adapter.rooms['room' + i]){
                if(io.sockets.adapter.rooms['room' + i].length < 2){
                  joinRoom(socket, playerData, 'room' + i);
                  foundRoom = true;
                  break;
                }
            }
        }
        //If not, make new room by filling in gap in room number 
        //or adding to the number of rooms
        if(!foundRoom){
            for(i = 0; i < roomCount; i++){
              if(!io.sockets.adapter.rooms['room' + i]){
                joinRoom(socket, playerData, 'room' + i);
                break;
              }else if(i == roomCount - 1){
                joinRoom(socket, playerData, 'room' + roomCount);
                roomCount++;
                break;
              }
            }
        }
    }
  });

  //Create private room as specified by user
  socket.on('connectPrivateRoom', function(playerData){
    joinRoom(socket, playerData, playerData.roomName);
  });

  //When user disconnects, notify server and opponent
  socket.on('disconnect', function() {
      console.log('user ' + players[socket.id].playerName +  ' disconnected from ' + players[socket.id].roomId);
      
      socket.broadcast.to(players[socket.id].roomId).emit('opponentDisconnect');

      // //remove this player from our players object
      delete players[socket.id];
  });

  //Take player input and send to opponent
  socket.on('playerInput', function(inputData){
      socket.broadcast.to(inputData.roomId).emit('opponentInput',inputData);
  });

  //Save logging data
  socket.on('log', function(logData){
      console.log("logging");
      var fs = require('fs');
      fs.writeFile(logData.logName.replace(/\s+/g, '_')+'.json', logData.logInfo, 'utf8', function (err) {
          if (err) throw err;
          console.log('Saved!');
      });
  });
});

//Listen on port
server.listen(8081, function() {
  console.log(`Listening on ${server.address().port}`);
});

//Let player join specified room
function joinRoom(socket, playerData, roomName){
  socket.join(roomName);
  newPlayer(socket, roomName, playerData.name);
  console.log(socket.id + ' has joined room ' + roomName);
}

//Create a new player and add it to our players object
function newPlayer(socket, roomName, name){
  players[socket.id] = {
      playerName: name,
      playerId: socket.id,
      roomId: roomName,
  };

  console.log("Player " + players[socket.id].playerName + " broadcasting to " + players[socket.id].roomId);
  io.in(roomName).emit('currentPlayers', players[socket.id]);//send to room a new player's data

  //Get list of clients in a room
  //If room is occupied
  //Retransmit data of player already in room
  io.of('/').in(roomName).clients((error, clients) => {
      if(clients[0]){
          io.in(roomName).emit('currentPlayers', players[clients[0]]);
      }
  })
}