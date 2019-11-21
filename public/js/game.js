//Classes
class Projectile{
    constructor(projectileType, imageReference){
        this.type = projectileType;
        
        if(this.type == "stone"){
            this.speed = 0;
        }else{
            this.speed = 100;
        }

        this.image = imageReference;
    }

    getType(){
        return this.type;
    }

    getSpeed(){
        return this.speed;
    }

    setSpeed(value){
        this.speed = value;
    }
}

class Player{
    constructor(playerID,roomId){
        this.playerID = playerID;
        this.roomId = roomId;
        this.currLane = 0;
        this.health = 100;
    }

    getHealth(){
        return this.health;
    }

    takeDamage(damageAmount){
        this.health = this.health - damageAmount;
        if(this.health < 0){
            this.health = 0;
        }
        return this.health;
    }
}

//Gestures
var gest = new gestures({
	debug: true,
	draw: true,
	drawColor: "#000000",
	drawWidth: 5,
	autoTrack: true,
	allowRotation: false,
	inverseShape: false,
	points: 33
})
//2nd
gest.addGesture("Pa", [
    {x: 0, y: 100},
    {x: 0, y: 75},
    {x: 0, y: 50},
    {x: 0, y: 0},
    
], updateGestureString);

gest.addGesture("Ka", [
    {x: 0, y: 50},
    {x: -15, y: 48},
    {x: -30, y: 40},
    {x: -40, y: 30},
    
], updateGestureString);

gest.addGesture("Ga", [
	{x: 0, y: 40},
    {x: -30, y: 50},
    {x: -40, y: 50},
    {x: -45, y: 48},
    {x: -50, y: 40},
    {x: -45, y: 30},
    {x: -45, y: 20},
    {x: -48, y: 10},
    {x: -55, y: 5},
], updateGestureString);

gest.addGesture("OU", [
	{x: 0, y: 85},
    {x: -10, y: 92},
    {x: -20, y: 97},
    {x: -30, y: 100},
    {x: -40, y: 100},
    {x: -45, y: 95},
    {x: -47, y: 90},
    {x: -45, y: 85},
    {x: -40, y: 80},
    {x: -35, y: 77},
    {x: -50, y: 77},
    {x: -55, y: 75},
    {x: -60, y: 70},
    {x: -57, y: 60},
    {x: -50, y: 50},
    {x: -45, y: 45},
    {x: -33, y: 40},
	{x: -20, y: 42},
	{x: -10, y: 46},
], updateGestureString);

gest.addGesture("Sa", [
    {x: 5, y: 87},
    {x: 0, y: 85},
    {x: -5, y: 80},
    {x: -10, y: 75},
    {x: -15, y: 65},
    {x: -20, y: 75},
    {x: -25, y: 90},
    {x: -30, y: 100},
    {x: -40, y: 100},
    {x: -45, y: 95},
    {x: -47, y: 90},
    {x: -45, y: 85},
    {x: -40, y: 80},
    {x: -35, y: 77},
    {x: -50, y: 77},
    {x: -55, y: 75},
    {x: -60, y: 70},
    {x: -57, y: 60},
    {x: -50, y: 50},
    {x: -45, y: 45},
    {x: -33, y: 40},
	{x: -20, y: 40},
	{x: -5, y: 46},
], updateGestureString);

gest.addGesture("Ba", [
	{x: -50, y: 60},
    {x: -45, y: 52},
    {x: -35, y: 47},
    {x: -20, y: 40},
    {x: -10, y: 33},
    {x: -5, y: 25},
    {x: 0, y: 17},
    {x: -5, y: 7},
    {x: -10, y: 0},
    {x: -20, y: 0},
    {x: -30, y: 2},
    {x: -40, y: 5},
    {x: -45, y: 10},
    {x: -50, y: 20},
    {x: -55, y: 10},
    {x: -60, y: 5},
    {x: -70, y: 2},
    {x: -80, y: 0},
	{x: -90, y: 0},
    {x: -95, y: 7},
    {x: -100, y: 17},
    {x: -95, y: 25},
    {x: -90, y: 33},
    {x: -80, y: 40},
    {x: -65, y: 47},
    {x: -55, y: 52},
], updateGestureString);

gest.addGesture("Ha", [
	{x: -25, y: 50},
    {x: -15, y: 45},
    {x: -10, y: 40},
    {x: -4, y: 32},
    {x: 0, y: 20},
    {x: -5, y: 10},
    {x: -15, y: 5},
    {x: -25, y: 5},
    {x: -40, y: 10},
    {x: -50, y: 25},
    {x: -60, y: 40},
    {x: -75, y: 45},
    {x: -85, y: 45},
    {x: -95, y: 40},
    {x: -100, y: 30},
    {x: -96, y: 22},
    {x: -90, y: 10},
    {x: -85, y: 5},
    {x: -75, y: 0},
], updateGestureString);

gest.addGesture("Ya", [
	{x: 0, y: 50},
    {x: -10, y: 40},
    {x: -15, y: 40},
    {x: -18, y: 20},
    {x: -22, y: 10},
    {x: -30, y: 0},
    {x: -45, y: 0},
    {x: -55, y: 5},
    {x: -60, y: 15},
    {x: -65, y: 30},
    {x: -60, y: 40},
    {x: -70, y: 50},
    {x: -80, y: 55},
    {x: -90, y: 55},
    {x: -100, y: 45},
    {x: -90, y: 40},
    {x: -80, y: 40},
    {x: -70, y: 50},
], updateGestureString);

gest.addGesture("Wa", [
	{x: 0, y: 80},
    {x: -20, y: 75},
    {x: -30, y: 70},
    {x: -20, y: 55},
    {x: -10, y: 45},
    {x: -5, y: 30},
    {x: -10, y: 15},
    {x: -25, y: 5},
    {x: -50, y: 0},
    {x: -75, y: 5},
    {x: -90, y: 15},
    {x: -95, y: 30},
    {x: -90, y: 40},
    {x: -80, y: 60},
], updateGestureString);


// gest.addGesture("Line", [
// 	{x: 0, y: 0},
// 	{x: 0, y: 25},
// 	{x: 0, y: 50},
// 	{x: 0, y: 75},
// 	{x: 0, y: 100}
// ], updateGestureString);

gest.addGesture("Square", [
	{x: 0, y: 0},
	{x: 100, y: 0},
	{x: 200, y: 0},
	{x: 200, y: 100},
	{x: 200, y: 200},
	{x: 100, y: 200},
	{x: 0, y: 200},
	{x: 0, y: 100},
	{x: 0, y: 0}
], updateGestureString);

gest.addGesture("Rectangle", [
	{x: 0, y: 0},
	{x: 105, y: 0},
	{x: 210, y: 0},
	{x: 210, y: 50},
	{x: 210, y: 100},
	{x: 105, y: 100},
	{x: 0, y: 100},
	{x: 0, y: 50},
	{x: 0, y: 0}
], updateGestureString);

// gest.addGesture("ZigZag", [
// 	{x: 0, y: 0},
// 	{x: 25, y: 44},
// 	{x: 50, y: 87},
// 	{x: 70, y: 44},
// 	{x: 100, y: 0},
// 	{x: 125, y: 44},
// 	{x: 150, y: 87}
// ], updateGestureString);

gest.addGesture("Triangle", [
	{x: 0, y: 0},
	{x: 50, y: 50},
	{x: 100, y: 100},
	{x: 50, y: 100},
	{x: 0, y: 100},
	{x: 0, y: 50},
	{x: 0, y: 0}
], updateGestureString);

// gest.addGesture("Equilateral Triangle", [
// 	{x: 0, y: 0},
// 	{x: 25, y: 44},
// 	{x: 50, y: 87},
// 	{x: 75, y: 44},
// 	{x: 100, y: 0},
// 	{x: 50, y: 0},
// 	{x: 0, y: 0}
// ], updateGestureString);

// gest.addGesture("Check", [
// 	{x: 0, y: 0},
// 	{x: 25, y: 25},
// 	{x: 50, y: 50},
// 	{x: 75, y: 25},
// 	{x: 100, y: 0},
// ], updateGestureString);

var x = 0;
var y = -100;
var circle = [];
var totalPoints = 72;
var step = (Math.PI*2)/totalPoints;

for(var angle = 1; angle < totalPoints; angle++)
{
	var newX = x*Math.cos(angle*step)-y*Math.sin(angle*step);
	var newY = y*Math.cos(angle*step)+x*Math.sin(angle*step);
	var point = {x: newX, y: newY};
	circle.push(point);
}

gest.addGesture("Circle", circle, updateGestureString);

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: (2/3)*window.outerHeight,
    height: window.outerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    gamePhase: 0,
};
   
var game = new Phaser.Game(config);
var emitter = new Phaser.Events.EventEmitter();
var otherPlayer;
var player;
// var gamePhase = 0;//0 for finding opponent, 1 for game playing, 2 for match end
var chars="";

function preload() {
    this.load.image('fire','assets/star_full.png');
    this.load.image('nature','assets/triangle.png');
    this.load.image('wind','assets/wind.png');
    this.load.image('water','assets/water.png');
    this.load.image('lightning','assets/lightning.png');
    this.load.image('stone','assets/stone.png')
    this.load.image('health_bar','assets/bar.png');
    this.load.image('bg','assets/bg.png');
    this.load.image('finding', 'assets/finding.png');
    this.load.image('win','assets/win.png');
    this.load.image('lose','assets/lose.png');
}
   
function create() {
    var self = this;
    this.socket = io();
    this.otherPlayers = this.physics.add.group();

    console.log(self.game.config.width);
    console.log(self.game.config.height);
    
    //Background
    this.background = this.add.image(self.game.config.width/2,self.game.config.height/2,'bg').setOrigin(0.5,0.5).setDisplaySize(self.game.config.width,self.game.config.height);

    //Loading gif
    this.loading = this.add.image(self.game.config.width/2, self.game.config.height/2,'finding').setOrigin(0.5,0.5).setDisplaySize(300, 75);
    
    //Projectiles
    this.myProjectiles = this.physics.add.group();//Projectiles sent by me on the field
    this.otherProjectiles = this.physics.add.group();//Projectiles sent by opponent on the field

    this.physics.add.overlap(this.myProjectiles.getChildren(), this.otherProjectiles.getChildren(), function(myProjectile, otherProjectile){//collision for projectiles
        if(myProjectile.weaknesses.includes(otherProjectile.type)){
            self.myProjectiles.remove(myProjectile);
            myProjectile.destroy();
        }

        if(otherProjectile.weaknesses.includes(myProjectile.type)){
            self.otherProjectiles.remove(otherProjectile);
            otherProjectile.destroy();
        }
    });

    this.socket.on('currentPlayers', function(player) {
        console.log(player.playerId + " === " + self.socket.id);
        if (player.playerId === self.socket.id) {
            addPlayer(self, player);
        } else {
            addOtherPlayer(self, player);
        }
    });

    // this.socket.on('newPlayer',function(playerInfo){//when other player is found
    //     addOtherPlayer(self, playerInfo);
    // });

    this.socket.on('disconnect', function(playerId){
        self.otherPlayers.getChildren().forEach(function (otherPlayer){
            if(playerId === otherPlayer.playerId){
                otherPlayer.destroy();
            }
        });
    });

    //Player input
    this.cursors = this.input.keyboard.createCursorKeys();

    //Fire projectile on lane
    this.input.on('pointerdown', function(pointer){
        console.log(self.game.config.gamePhase);
        if(self.game.config.gamePhase == 1){
            console.log(pointer.x + ", " + pointer.y);
            if(self.player){
                if(pointer.x < self.game.config.width/3){
                    self.player.currLane = 0;
                }else if(pointer.x < self.game.config.width*(2/3)){
                    self.player.currLane = 1;
                }else{
                    self.player.currLane = 2;
                }
                console.log(self.player.currLane);
            }
            gest.clear();
            var type = identifyProjectile();
            if(type){
                console.log(type);
                self.myProjectiles.add(addProjectile(self, type, laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
                this.socket.emit('playerInput', {type: type, x: laneToCoord(self, self.player.currLane), y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
                chars = "";
            }else{
                console.log("No match");
                chars="";
            }
        }

        if(self.game.config.gamePhase == 2){
            console.log("Restarting");
            location.reload(true);
        }
    }, this);

    // emitter.on('throw_projectile', function(type){
    //     self.myProjectiles.add(addProjectile(self, type,laneToCoord(self.player.currLane), self.game.config.width - self.game.config.width/6));
    //     this.socket.emit('playerInput', {type: type, x: laneToCoord(self.player.currLane), y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    // }, this)

    //Throw Projectile (For debugging)
    this.input.keyboard.on('keydown_Q', function(event){//Fire
        const pointer = self.input.activePointer;
        this.socket.emit('playerInput', {type: "fire", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
        self.myProjectiles.add(addProjectile(self, "fire",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
    }, this);

    this.input.keyboard.on('keydown_E', function(event){//Nature
        const pointer = self.input.activePointer;
        self.myProjectiles.add(addProjectile(self, "nature",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        this.socket.emit('playerInput', {type: "nature", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    }, this);

    this.input.keyboard.on('keydown_W', function(event){//Water
        const pointer = self.input.activePointer;
        self.myProjectiles.add(addProjectile(self, "water",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        this.socket.emit('playerInput', {type: "water", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    }, this);

    this.input.keyboard.on('keydown_A', function(event){//Lightning
        const pointer = self.input.activePointer;
        self.myProjectiles.add(addProjectile(self, "lightning",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        this.socket.emit('playerInput', {type: "lightning", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    }, this);

    this.input.keyboard.on('keydown_D', function(event){//Wind
        const pointer = self.input.activePointer;
        self.myProjectiles.add(addProjectile(self, "wind",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        this.socket.emit('playerInput', {type: "wind", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    }, this);

    this.input.keyboard.on('keydown_S', function(event){//Stone
        const pointer = self.input.activePointer;
        self.myProjectiles.add(addProjectile(self, "stone",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        this.socket.emit('playerInput', {type: "stone", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    }, this);

    this.socket.on('playerClicked',function(projectileData){
        //const op = self.physics.add.image(projectileData.x,600 - projectileData.y,'otherPlayer');//relative to screen height
        //op.setVelocityY(3);
        console.log(projectileData.lane);
        self.otherProjectiles.add(addProjectile(self,projectileData.type, laneToCoord(self, projectileData.lane), self.game.config.width/10 + self.game.config.width/6));
    }, this);
}

function update() {
    var self = this;
    var gameEnd = false;

    this.myProjectiles.getChildren().forEach(function(projectileObject) {//Behaviour of projectiles sent by me
        projectileObject.setVelocityY(-projectileObject.speed);
        //projectileObject.body.debugBodyColor = projectileObject.body.touching.none ? 0x0099ff : 0xff9900;
        if(projectileObject.y < (self.otherPlayer.healthBar.y + projectileObject.height)){
            if(self.otherPlayer && self.player.getHealth() > 0){
                self.otherPlayer.takeDamage(10);
                self.otherPlayer.healthBar.displayWidth = 400*(self.otherPlayer.getHealth()/100);

                if(self.otherPlayer.getHealth() == 0){//if opponent health goes to zero
                    gameEnd(self, 1);
                    gameEnd = true;
                }
            }
            self.myProjectiles.remove(projectileObject);//stop tracking projectile
            projectileObject.destroy();
        }
    }, this);

    this.otherProjectiles.getChildren().forEach(function(projectileObject) {//Behaviour of projectiles sent by opponent
        projectileObject.setVelocityY(projectileObject.speed);
        if(projectileObject.y > (self.player.healthBar.y - projectileObject.height)){
            if(self.player && self.player.getHealth() > 0){
                self.player.takeDamage(10);
                console.log(self.player.getHealth());
                self.player.healthBar.displayWidth = 400*(self.player.getHealth()/100);

                if(self.player.getHealth() == 0){//if player health goes to zero
                    gameEnd(self, 0);
                    gameEnd = true;
                }
            }
            self.otherProjectiles.remove(projectileObject);//stop tracking projectile
            projectileObject.destroy();
        }
    }, this);

    //Game Phases
    if(!self.otherPlayer){//if still waiting for opponent
        if(!this.loading){
            this.loading = this.add.image(self.game.config.width/2, self.game.config.height/2,'finding').setOrigin(0.5,0.5).setDisplaySize(300, 75); //Add loading gif if needed
        }
        self.game.config.gamePhase = 0;
    }else if(self.otherPlayer){//if there is opponent
        if(this.loading){//remove loading gif
            this.loading.destroy();
        }
        self.game.config.gamePhase = 1;
    }

    if(gameEnd){
        console.log("Game done");
        self.game.config.gamePhase = 2;
    }
}

function addPlayer(self, playerInfo){
    self.player = new Player(playerInfo.playerId,playerInfo.roomId);//temp values
    console.log("Player: " + self.player);
    self.player.healthBar = self.add.sprite(self.game.config.width/2,self.game.config.width,'health_bar').setOrigin(0.5,0.5).setDisplaySize(self.game.config.width*(self.player.health/100),self.game.config.width/10);
}

function addOtherPlayer(self, playerInfo) {
    //const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5,0.5).setDisplaySize(53,40);
    self.otherPlayer = new Player(playerInfo.name,playerInfo.sessionId)
    console.log("Opponent: " + self.otherPlayer);
    self.otherPlayer.healthBar = self.add.sprite(self.game.config.width/2,self.game.config.width/20,'health_bar').setOrigin(0.5,0.5).setDisplaySize(self.game.config.width*(self.otherPlayer.health/100),self.game.config.width/10);
    self.otherPlayer.healthBar.setTint(0x00ff00);
}

function addProjectile(self, projectileType, posx, posy){
    const p = self.physics.add.image(posx,posy,projectileType).setOrigin(0.5,0.5).setDisplaySize(self.game.config.width/6, self.game.config.width/6);
    p.type = projectileType;
    if(projectileType == "stone"){
        p.speed = 0;
    }else{
        p.speed = 100;
    }

    //Weaknesses
    switch(projectileType){
        case 'fire':
            p.weaknesses = [p.type,"water","wind","stone"];
            break;
        case 'water':
            p.weaknesses = [p.type,"lightning","nature","stone"];
            break;
        case 'wind':
            p.weaknesses = [p.type,"water","nature","stone"];
            break;
        case 'lightning':
            p.weaknesses = [p.type,"fire","wind","stone"];
            break;
        case 'nature':
            p.weaknesses = [p.type,"fire","lightning","stone"];
            break;
        case 'stone':
            p.weaknesses = [p.type,"fire","lightning","wind","water","nature"];
            break;
    }
    return p;
}

function updateGestureString(fig){
    chars += fig;
    console.log(chars);
}

function identifyProjectile(){
    // var self = this;
    
    var type = "";
    //console.log(name);
    switch(chars){
        case 'Ha':
            type = "wind";
            break;
        case 'Ba':
            type = "stone";
            break;
        case 'Wa':
            type="water";
            break;
        case 'OU':
            type = "lightning";
            break;
        case 'Ya':
            type="nature";
            break;
        case 'Pa':
            type="fire";
            break;
    }
    console.log(chars)
    console.log(type);
    //const pointer = self.input.activePointer;
    //Emit projectile event
    //emitter.emit('throw_projectile', type);
    return type;
}

function laneToCoord(self, lane){
    switch(lane){
        case 0:
            return self.game.config.width/6;
        case 1:
            return self.game.config.width/2;
        case 2:
            return (self.game.config.width*5)/6;
    }
}

function gameEnd(self, winner){
    self.socket.disconnect()
    if(winner){
        self.win = self.add.image(self.game.config.width/2, self.game.config.height/2,'win').setOrigin(0.5,0.5).setDisplaySize(200, 75);
    }else{
        self.lose = self.add.image(self.game.config.width/2, self.game.config.height/2,'lose').setOrigin(0.5,0.5).setDisplaySize(200, 75);
    }   
}