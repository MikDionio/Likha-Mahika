//Classes
class Projectile{
    constructor(projectileType, imageReference){
        this.type = projectileType;
        
        if(this.type == "stone"){
            this.speed = 0;
        }else{
            this.speed = 30;
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
// ], throwProjectile);

// gest.addGesture("Square", [
// 	{x: 0, y: 0},
// 	{x: 100, y: 0},
// 	{x: 200, y: 0},
// 	{x: 200, y: 100},
// 	{x: 200, y: 200},
// 	{x: 100, y: 200},
// 	{x: 0, y: 200},
// 	{x: 0, y: 100},
// 	{x: 0, y: 0}
// ], throwProjectile);

// gest.addGesture("Rectangle", [
// 	{x: 0, y: 0},
// 	{x: 105, y: 0},
// 	{x: 210, y: 0},
// 	{x: 210, y: 50},
// 	{x: 210, y: 100},
// 	{x: 105, y: 100},
// 	{x: 0, y: 100},
// 	{x: 0, y: 50},
// 	{x: 0, y: 0}
// ], throwProjectile);

// // gest.addGesture("ZigZag", [
// // 	{x: 0, y: 0},
// // 	{x: 25, y: 44},
// // 	{x: 50, y: 87},
// // 	{x: 70, y: 44},
// // 	{x: 100, y: 0},
// // 	{x: 125, y: 44},
// // 	{x: 150, y: 87}
// // ], throwProjectile);

// gest.addGesture("Triangle", [
// 	{x: 0, y: 0},
// 	{x: 50, y: 50},
// 	{x: 100, y: 100},
// 	{x: 50, y: 100},
// 	{x: 0, y: 100},
// 	{x: 0, y: 50},
// 	{x: 0, y: 0}
// ], throwProjectile);

// gest.addGesture("Equilateral Triangle", [
// 	{x: 0, y: 0},
// 	{x: 25, y: 44},
// 	{x: 50, y: 87},
// 	{x: 75, y: 44},
// 	{x: 100, y: 0},
// 	{x: 50, y: 0},
// 	{x: 0, y: 0}
// ], throwProjectile);

// gest.addGesture("Check", [
// 	{x: 0, y: 0},
// 	{x: 25, y: 25},
// 	{x: 50, y: 50},
// 	{x: 75, y: 25},
// 	{x: 100, y: 0},
// ], throwProjectile);

// var x = 0;
// var y = -100;
// var circle = [];
// var totalPoints = 72;
// var step = (Math.PI*2)/totalPoints;

// for(var angle = 1; angle < totalPoints; angle++)
// {
// 	var newX = x*Math.cos(angle*step)-y*Math.sin(angle*step);
// 	var newY = y*Math.cos(angle*step)+x*Math.sin(angle*step);
// 	var point = {x: newX, y: newY};
// 	circle.push(point);
// }

// gest.addGesture("Circle", circle, throwProjectile);

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 600,
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
    } 
};
   
var game = new Phaser.Game(config);
var emitter = new Phaser.Events.EventEmitter();
var otherPlayer;
var player;
var startGame = true;
var chars="";

function preload() {
    this.load.image('ship','assets/spaceShips_001.png');
    this.load.image('otherPlayer','assets/enemyBlack5.png');
    this.load.image('fire','assets/star_full.png');
    this.load.image('nature','assets/triangle.png');
    this.load.image('wind','assets/wind.png');
    this.load.image('water','assets/water.png');
    this.load.image('lightning','assets/lightning.png');
    this.load.image('stone','assets/stone.png')
    this.load.image('health_bar','assets/bar.png');
    this.load.image('bg','assets/bg.png');
}
   
function create() {
    var self = this;
    this.socket = io();
    this.otherPlayers = this.physics.add.group();
    

    //Background
    this.background = this.add.image(200,200,'bg').setOrigin(0.5,0.5);
    //Projectiles
    this.myProjectiles = this.physics.add.group();//Projectiles sent by me on the field
    this.otherProjectiles = this.physics.add.group();//Projectiles sent by opponent on the field

    this.physics.add.overlap(this.myProjectiles.getChildren(), this.otherProjectiles.getChildren(), function(myProjectile, otherProjectile){
        if(myProjectile.weaknesses.includes(otherProjectile.type)){
            self.myProjectiles.remove(myProjectile);
            myProjectile.destroy();
        }

        if(otherProjectile.weaknesses.includes(myProjectile.type)){
            self.otherProjectiles.remove(otherProjectile);
            otherProjectile.destroy();
        }
    });

    this.socket.on('currentPlayers', function(players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
    });

    this.socket.on('newPlayer',function(playerInfo){
        addOtherPlayers(self, playerInfo);
    });

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
        console.log(pointer.x + ", " + pointer.y);
        if(self.player){
            if(pointer.x < 128){
                self.player.currLane = 0;
            }else if(pointer.x < 271){
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
            self.myProjectiles.add(addProjectile(self, type, laneToCoord(self.player.currLane), 380));
            this.socket.emit('playerInput', {type: type, x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
            chars = "";
        }else{
            console.log("No match");
            chars="";
        }
    }, this);

    // emitter.on('throw_projectile', function(type){
    //     self.myProjectiles.add(addProjectile(self, type,laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: type, x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this)

    //Throw Projectile (For debugging)
    // this.input.keyboard.on('keydown_Q', function(event){//Fire
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "fire",laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: "fire", x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_E', function(event){//Nature
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "nature",laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: "nature", x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_W', function(event){//Water
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "water",laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: "water", x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_A', function(event){//Lightning
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "lightning",laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: "lightning", x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_D', function(event){//Wind
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "wind",laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: "wind", x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_S', function(event){//Stone
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "stone",laneToCoord(self.player.currLane), 380));
    //     this.socket.emit('playerInput', {type: "stone", x: laneToCoord(self.player.currLane), y: 380, roomId: self.player.roomId});
    // }, this);

    this.socket.on('playerClicked',function(projectileData){
        //const op = self.physics.add.image(projectileData.x,600 - projectileData.y,'otherPlayer');//relative to screen height
        //op.setVelocityY(3);
        self.otherProjectiles.add(addProjectile(self,projectileData.type,projectileData.x, 40));
        console.log(self.otherProjectiles);
    }, this);
}

function update() {
    var self = this;
    
    if(this.ship){
        if(this.cursors.left.isDown){
            this.ship.setAngularVelocity(-150);
        }else if (this.cursors.right.isDown){
            this.ship.setAngularVelocity(150);
        } else {
            this.ship.setAngularVelocity(0);
        }

        if (this.cursors.up.isDown){
            this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        }
    }

    this.myProjectiles.getChildren().forEach(function(projectileObject) {//Behaviour of projectiles sent by me
        projectileObject.setVelocityY(-projectileObject.speed);
        //projectileObject.body.debugBodyColor = projectileObject.body.touching.none ? 0x0099ff : 0xff9900;
        if(projectileObject.y < 40){
            if(self.otherPlayer){
                self.otherPlayer.takeDamage(10);
                self.otherPlayer.healthBar.displayWidth = 400*(self.otherPlayer.getHealth()/100);
            }
            self.myProjectiles.remove(projectileObject);//stop tracking projectile
            projectileObject.destroy();
        }
    });

    this.otherProjectiles.getChildren().forEach(function(projectileObject) {//Behaviour of projectiles sent by other user
        projectileObject.setVelocityY(projectileObject.speed);
        if(projectileObject.y > 380){
            if(self.player){
                self.player.takeDamage(10);
                self.player.healthBar.displayWidth = 400*(self.player.getHealth()/100);
            }
            self.otherProjectiles.remove(projectileObject);//stop tracking projectile
            projectileObject.destroy();
        }
    });
}

function addPlayer(self, playerInfo){
    self.player = new Player(playerInfo.playerId,playerInfo.roomId);//temp values
    self.player.healthBar = self.add.sprite(200,400,'health_bar').setOrigin(0.5,0.5).setDisplaySize(400*(self.player.health/100),40);
}

function addOtherPlayers(self, playerInfo) {
    //const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5,0.5).setDisplaySize(53,40);
    self.otherPlayer = new Player(playerInfo.name,playerInfo.sessionId)
    self.otherPlayer.healthBar = self.add.sprite(200,10,'health_bar').setOrigin(0.5,0.5).setDisplaySize(400*(self.otherPlayer.health/100),40);
    self.otherPlayer.healthBar.setTint(0x00ff00);
}

function addProjectile(self, projectileType, posx, posy){
    const p = self.physics.add.image(posx,posy,projectileType);
    p.type = projectileType;
    if(projectileType == "stone"){
        p.speed = 0;
    }else{
        p.speed = 30;
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
        case 'Line':
            type = "wind";
            break;
        case 'Rectangle':
            type = "stone";
            break;
        case 'ZigZag':
            type="lightning";
            break;
        case 'Triangle':
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

function laneToCoord(lane){
    switch(lane){
        case 0:
            return 64;
        case 1:
            return 200;
        case 2:
            return 335;
    }
}