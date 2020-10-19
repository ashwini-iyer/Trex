var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage, cloud;
var obstacle, obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudsGroup,obstaclesGroup;
var PLAY = 1;
var END = 0
var restart, restartImage, gameover, gameoverImage
var score
var gamestate = PLAY
function preload(){ 
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png"); trex_collided = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png") 
 cloudimage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  restartImage=loadImage("restart.png")
 gameoverImage=loadImage("gameOver.png")
} 

function setup() 
{
  createCanvas(600,200);
 trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running); 
  
 trex.scale = 0.5; ground = createSprite(300,180,600,20); ground.addImage("ground",groundImage);
 ground.x = ground.width /2; 
  
  invisibleGround = 
    createSprite(300,190,600,10); 
  invisibleGround.visible = false; 
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
  gameover = createSprite(300,80)
  gameover.addImage("gameover",gameoverImage)
  restart = createSprite(300,110)
  restart.addImage("restart",restartImage)
  gameover.scale=0.5
  restart.scale=0.5 
  gameover.visible = false
  restart.visible = false
  trex.addAnimation("trex_collided",trex_collided)
  score = 0
}
function draw() 
{
  background(180); 
 text("score:"+score,500,50)
  
  trex.collide(invisibleGround);
  
  drawSprites();
  if(gamestate === PLAY) {
    ground.velocityX = -2; 
     if(keyDown("space")&& trex.y>=161.5) 
    { trex.velocityY = -10; 
  
    } 
    trex.velocityY = trex.velocityY + 0.8; 
    score=score+Math.round(getFrameRate()/60)
  if (ground.x < 0){ 
    ground.x = ground.width/2; 
  } 
    spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gamestate = END
    }
 }
  else if(gamestate === END){
  ground.velocityX = 0; 
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.changeAnimation("trex_collided",trex_collided)
    gameover.visible = true
  restart.visible = true
    if(mousePressedOver(restart)){
      reset();
      
    } 
  }
}
function reset(){
  gamestate = PLAY
  trex.changeAnimation("running", trex_running)
  gameover.visible = false
  restart.visible = false
  score = 0
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
     cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        default : break; 

    
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}
