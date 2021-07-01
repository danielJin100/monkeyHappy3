var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaGroup, bananaImg;
var rockGroup, rock;
var edge;

const END =0;
const PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImg=loadImage("banana.png");
  rock = loadImage("stone.png");
  gameOver = loadImage("gameOver.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  bananaGroup = createGroup();
  rockGroup = createGroup();
  edge = createSprite(0, 200, 10, 400);
  edge.shapeColor = rgb(0, 0, 0, 0);
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(frameCount % 60 === 0){
      spawnBananas();
      if(Math.round(random(0, 1)) === 1){
        spawnRocks();
      }
    }
    if(player.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      player.scale += 0.01;
    }
    if(player.isTouching(rockGroup) || bananaGroup.isTouching(edge)){
      gameState = END;
      
    }
    drawSprites();
  }

  if(gameState === END){
    image(gameOver, 0, 80, 800, 240);
  }
}

function spawnBananas() {
  var sprite = createSprite(600, Math.round(random(120, 200)), 40, 10);
  sprite.addImage(bananaImg)
  sprite.scale = 0.05;
  sprite.velocityX = -4;

  sprite.lifetime = 300;
  player.depth = sprite.depth + 1;
  bananaGroup.add(sprite);
}
function spawnRocks() {
  var sprite = createSprite(600, 360, 40, 10);
  sprite.addImage(rock)
  sprite.scale = 0.2;
  sprite.velocityX = -4;

  sprite.lifetime = 300;
  player.depth = sprite.depth + 1;
  rockGroup.add(sprite);
}