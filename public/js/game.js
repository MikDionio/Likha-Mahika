//Classes
class Player{
    constructor(playerID,roomId){
        this.playerID = playerID;
        this.roomId = roomId;
        this.currLane = 0;
        this.health = 10;
        this.projectile_type = "";
        this.ward_type = "";
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

    getProjectile(){
        return this.projectile_type;
    }

    setProjectile(p){
        this.projectile_type = p;
    }

    setWard(w){
        this.ward_type = w;
    }

    getWard(){
        return this.ward_type;
    }
}

class Projectile{
    constructor(projectileType, imageReference){
        this.type = projectileType;
        
        if(this.type == "stone"){
            this.speed = 0;
        }else{
            this.speed = 200;
        }

        this.image = imageReference;

        this.resistance = 1;
    }

    getType(){
        return this.type;
    }

    getSpeed(){
        return this.speed;
    }

    setSpeed(s){
        this.speed = s;
    }

    getResistance(){
        return this.resistance;
    }

    setResistance(r){
        this.resistance = r;
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

// gest.addGesture("Circle", circle, updateGestureString);

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: (2/3)*window.outerHeight,
    height: window.outerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
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
    // this.load.image('fire','assets/star_full.png');
    // this.load.image('nature','assets/triangle.png');
    // this.load.image('PSky','assets/wind.png');
    // this.load.image('WSky', 'assets/wind.png');
    // this.load.image('PWater','assets/water.png');
    // this.load.image('WWater','assets/water.png');
    // this.load.image('lightning','assets/lightning.png');
    // this.load.image('stone','assets/stone.png');
    this.load.image('PWater','assets/PWater.png');
    this.load.image('WWater','assets/WWater.png');
    this.load.image('PWaterII','assets/PWaterII.png');
    this.load.image('WWaterII','assets/WWaterII.png');
    this.load.image('PSky','assets/PSky.png');
    this.load.image('WSky','assets/WSky.png');
    this.load.image('PSkyII','assets/PSkyII.png');
    this.load.image('WSkyII','assets/WSkyII.png');
    this.load.image('PEarth','assets/PEarth.png');
    this.load.image('WEarth','assets/WEarth.png');
    this.load.image('PEarthII','assets/PEarthII.png');
    this.load.image('WEarthII','assets/WEarthII.png');
    this.load.image('health_bar','assets/bar.png');
    this.load.image('bg','assets/bgII.png');
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

    //Wards
    this.myWard = this.physics.add.group();
    this.otherWard = this.physics.add.group();

    //Projectile Ward collision
    this.physics.add.overlap(this.myProjectiles.getChildren(), this.otherWard.getChildren(), projectileWardCollision, null, this);

    this.physics.add.overlap(this.otherProjectiles.getChildren(), this.myWard.getChildren(), projectileWardCollision, null, this);

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
        if(self.game.config.gamePhase == 1){
            console.log("Clicked")
            gest.clear();
            var type = identifyProjectile();
            if(type[0] == 'P'){
                self.player.setProjectile(type);
                this.socket.emit('playerChangeProjectile', {projectile_type: self.player.getProjectile(), roomId: self.player.roomId});
            }else if(type){
                self.player.setWard(type);
                if(self.myWard.type){
                    self.myWard.destroy();
                }
                this.myWard = addWard(self, self.player.getWard(), laneToCoord(this, 0), this.player.healthBar.y - this.game.config.width/6);
                this.socket.emit('playerChangeWard',{ward_type: self.player.getWard(), roomId: self.player.roomId});
            }
        }

        if(self.game.config.gamePhase == 2){
            console.log("Restarting");
            location.reload(true);
        }
    }, this);

    //Throw Projectile (For debugging)
    this.input.keyboard.on('keydown_Q', function(event){//Sky
        // const pointer = self.input.activePointer;
        // this.socket.emit('playerInput', {type: "fire", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
        // self.myProjectiles.add(addProjectile(self, "fire",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        self.player.setProjectile("PSky");
        this.socket.emit('playerInput', {projectile_type: self.player.getProjectile(), ward_type: self.player.getWard(), roomId: self.player.roomId});
        // console.log(self.player.getProjectile());
    }, this);

    this.input.keyboard.on('keydown_E', function(event){//Sky Ward
        // const pointer = self.input.activePointer;
        // self.myProjectiles.add(addProjectile(self, "nature",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
        // this.socket.emit('playerInput', {type: "nature", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
        self.player.setWard("WSky");
        if(self.myWard.type){
            self.myWard.destroy();
        }
        this.myWard.add(addWard(self, self.player.getWard(), laneToCoord(this, 0), this.player.healthBar.y - this.game.config.width/6));
        this.socket.emit('playerInput', {projectile_type: self.player.getProjectile(), ward_type: self.player.getWard(), roomId: self.player.roomId});
    }, this);

    this.input.keyboard.on('keydown_W', function(event){//Water
        self.player.setProjectile("PWater");
        this.socket.emit('playerInput', {projectile_type: self.player.getProjectile(), ward_type: self.player.getWard(), roomId: self.player.roomId});
    }, this);

    this.input.keyboard.on('keydown_A', function(event){//Water Ward
        self.player.setWard("WWater");
        if(self.myWard.type){
            self.myWard.destroy();
        }
        this.myWard.add(addWard(self, self.player.getWard(), laneToCoord(this, 0), this.player.healthBar.y - this.game.config.width/6));
        this.socket.emit('playerInput', {projectile_type: self.player.getProjectile(), ward_type: self.player.getWard(), roomId: self.player.roomId});
    }, this);

    // this.input.keyboard.on('keydown_A', function(event){//Lightning
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "lightning",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
    //     this.socket.emit('playerInput', {type: "lightning", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_D', function(event){//Wind
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "wind",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
    //     this.socket.emit('playerInput', {type: "wind", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    // }, this);

    // this.input.keyboard.on('keydown_S', function(event){//Stone
    //     const pointer = self.input.activePointer;
    //     self.myProjectiles.add(addProjectile(self, "stone",laneToCoord(self, self.player.currLane), self.game.config.width - self.game.config.width/6));
    //     this.socket.emit('playerInput', {type: "stone", lane: self.player.currLane, y: self.game.config.width - self.game.config.width/6, roomId: self.player.roomId});
    // }, this);

    this.socket.on('playerClicked',function(inputData){
        self.otherPlayer.setProjectile(inputData.projectile_type);
        if(self.otherPlayer.getWard() != inputData.ward_type){
            self.otherPlayer.setWard(inputData.ward_type);
            if(self.otherWard.getChildren()[0]){
                self.otherWard.getChildren()[0].destroy();
            }
            self.otherWard.add(addWard(self, self.otherPlayer.getWard(), laneToCoord(self, 1), self.otherPlayer.healthBar.y + self.game.config.width/6));
            self.otherWard.children.each(entity => entity.flipY = true)
        }
        
    }, this);

    this.socket.on('otherPlayerChangeProjectile', function(projectileData){//change projectile only
        self.otherPlayer.setProjectile(projectileData.projectile_type);
    }, this);

    this.socket.on('otherPlayerChangeWard', function(wardData){//change ward only
        if(self.otherPlayer.getWard() != wardData.ward_type){
            self.otherPlayer.setWard(wardData.ward_type);
            if(self.otherWard.getChildren()[0]){
                self.otherWard.getChildren()[0].destroy();
            }
            self.otherWard.add(addWard(self, self.otherPlayer.getWard(), laneToCoord(self, 1), self.otherPlayer.healthBar.y + self.game.config.width/6));
            self.otherWard.children.each(entity => entity.flipY = true)
        }
    }, this)

    timedEvent = this.time.addEvent({ delay: 1500, callback: fireProjectiles, callbackScope: this, loop: true });
}

function update() {
    var self = this;
    var gameEnd = false;

    if(self.game.config.gamePhase == 1){
        this.myProjectiles.getChildren().forEach(function(projectileObject) {//Behaviour of projectiles sent by me
            projectileObject.setVelocityY(-projectileObject.speed);
            //projectileObject.body.debugBodyColor = projectileObject.body.touching.none ? 0x0099ff : 0xff9900;
            if(projectileObject.y < (self.otherPlayer.healthBar.y + projectileObject.height)){
                if(self.otherPlayer && self.player.getHealth() > 0){
                    self.otherPlayer.takeDamage(projectileObject.power);
                    self.otherPlayer.healthBar.displayWidth = self.game.config.width*(self.otherPlayer.getHealth()/10);
    
                    if(self.otherPlayer.getHealth() == 0){//if opponent health goes to zero
                        endGame(self, 1);
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
                    self.player.takeDamage(projectileObject.power);
                    console.log(self.player.getHealth());
                    self.player.healthBar.displayWidth = self.game.config.width*(self.player.getHealth()/10);
                    if(self.player.getHealth() == 0){//if player health goes to zero
                        endGame(self, 0);
                        gameEnd = true;
                    }
                }
                self.otherProjectiles.remove(projectileObject);//stop tracking projectile
                projectileObject.destroy();
            }
        }, this);
    }

    //Game Phases
    if(!self.otherPlayer){//if still waiting for opponent
        if(!this.loading){
            this.loading = this.add.image(self.game.config.width/2, self.game.config.height/2,'finding').setOrigin(0.5,0.5).setDisplaySize(300, 75); //Add loading gif if needed
        }
        self.game.config.gamePhase = 0;
    }else if(self.otherPlayer && self.game.config.gamePhase == 0){//if there is opponent
        if(this.loading){//remove loading gif
            this.loading.destroy();
        }
        self.game.config.gamePhase = 1;
    }

    if(gameEnd && self.game.config.gamePhase == 1){
        self.game.config.gamePhase = 2;
    }
}

function projectileWardCollision(projectile, ward){//collision for projectiles
        
    temp = ward.resistance;
    
    if(ward.weaknesses.includes(projectile.type)){
        ward.resistance = ward.resistance - projectile.power;
    }

    projectile.power = projectile.power - temp;

    // console.log("Collide. Resistance: " + otherWard.resistance);

    if(projectile.power <= 0){
        projectile.destroy();
    }

    if(ward.resistance <= 0){
        ward.destroy();
    }
}

function fireProjectiles(){
    if(this.game.config.gamePhase == 1){
        if(this.player.getProjectile()){
            this.myProjectiles.add(addProjectile(this, this.player.getProjectile(), laneToCoord(this, 1), this.player.healthBar.y - this.game.config.width/6)); 
        }
    
        if(this.otherPlayer.getProjectile()){
            this.otherProjectiles.add(addProjectile(this, this.otherPlayer.getProjectile(), laneToCoord(this, 0), this.otherPlayer.healthBar.y + this.game.config.width/6));
            this.otherProjectiles.children.each(entity => entity.flipY = true)
        }
    }
    
}

function addPlayer(self, playerInfo){
    if(!self.player){
        self.player = new Player(playerInfo.playerId,playerInfo.roomId);//temp values
        console.log("Player: " + self.player);
        self.player.healthBar = self.add.sprite(self.game.config.width/2,self.game.config.height-self.game.config.width/10,'health_bar').setOrigin(0.5,0.5).setDisplaySize(self.game.config.width*(self.player.health/10),self.game.config.width/10);
    }
    
}

function addOtherPlayer(self, playerInfo) {
    if(!self.otherPlayer){
        self.otherPlayer = new Player(playerInfo.name,playerInfo.sessionId)
        console.log("Opponent: " + self.otherPlayer);
        self.otherPlayer.healthBar = self.add.sprite(self.game.config.width/2,self.game.config.width/20,'health_bar').setOrigin(0.5,0.5).setDisplaySize(self.game.config.width*(self.otherPlayer.health/10),self.game.config.width/10);
        self.otherPlayer.healthBar.setTint(0x00ff00);
    }
}

function addProjectile(self, projectileType, posx, posy){
    const p = self.physics.add.image(posx,posy,projectileType).setOrigin(0.5,0.5).setDisplaySize(self.game.config.width/12, self.game.config.width/6);
    p.type = projectileType;
    p.speed = 200;

    switch(projectileType){
        case 'PWaterII': 
            p.power = 2;
            break;
        case 'PEarthII': 
            p.power = 2;
            break;
        case 'PSkyII': 
            p.power = 2;
            break;
        default:
            p.power = 1;
    }
    return p;
}

function addWard(self, wardType, posx, posy){
    const w = self.physics.add.image(posx, posy, wardType).setOrigin(0.5, 0.5).setDisplaySize(self.game.config.width/4, self.game.config.width/12);
    w.type = wardType;
    switch(wardType){
        case 'WWaterII': 
            w.resistance = 3;
            w.weaknesses = ["PSkyII"];
            break;
        case 'WEarthII': 
            w.resistance = 3;
            w.weaknesses = ["PWaterII"];
            break;
        case 'WSkyII': 
            w.resistance = 3;
            w.weaknesses = ["PEarthII"];
            break;
        case 'WWater':
            w.resistance = 1;
            w.weaknesses = ["PSkyII", "PEarthII", "PSky"];
            break;
        case 'WEarth':
            w.resistance = 1;
            w.weaknesses = ["PWaterII", "PSkyII", "PWater"];
            break;
        case 'WSky':
            w.resistance = 1;
            w.weaknesses = ["PEarthII", "PWaterII", "PEarth"];
            break;
    }
    return w;
}

function updateGestureString(fig, points){
    console.log(points);
    chars += fig;
}

function identifyProjectile(){
    // var self = this;
    
    var type = "";
    //console.log(name);
    switch(chars){
        case 'Ha':
            type = "WWater";
            break;
        case 'Ba':
            type = "PWater";
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
    console.log(chars);
    console.log(type);

    chars = "";
    //const pointer = self.input.activePointer;
    //Emit projectile event
    //emitter.emit('throw_projectile', type);
    return type;
}

function laneToCoord(self, lane){
    switch(lane){
        case 0:
            return self.game.config.width*(4/10);
        case 1:
            return self.game.config.width*(6/10);
    }
}

function endGame(self, winner){
    self.socket.disconnect()
    if(winner){
        self.win = self.add.image(self.game.config.width/2, self.game.config.height/2,'win').setOrigin(0.5,0.5).setDisplaySize(200, 75);
    }else{
        self.lose = self.add.image(self.game.config.width/2, self.game.config.height/2,'lose').setOrigin(0.5,0.5).setDisplaySize(200, 75);
    }
}