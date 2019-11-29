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
app.use('/', routes);
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);

// catch all other routes
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error : err });
});

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});

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

//
io.on('connection', function(socket){
    // console.log('a user connected');

    if(roomCount == 0){
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