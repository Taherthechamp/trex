var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,trexCol_img,gameover,gameover_img,restart,restart_img;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var PLAY=1;
var END=0;
var gameState=PLAY
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexCol_img=loadAnimation("trex_collided.png")
  restart_img=loadImage("restart.png")
  gameover_img=loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trexCol_img)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  gameover=createSprite(300,50)
restart=createSprite(300,100)
  gameover.addImage(gameover_img);
  restart.addImage(restart_img);
  restart.scale=0.5;
  gameover.scale=0.5

  
  score = 0;
}

function draw() {
  background("yellow");
   text("Score: "+ score, 500,50);
  trex.collide(invisibleGround);

  if(gameState===PLAY){
     ground.velocityX = -(4+10*score/100);
     score = score + Math.round(getFrameRate()/60);
   if(keyDown("space")&&trex.y>161.5) {
    trex.velocityY = -14;
  }
     restart.visible=false
  gameover.visible=false
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
      spawnClouds();
  spawnObstacles();
  if(obstaclesGroup.isTouching(trex)){
  gameState=END
  }
  }
else if(gameState===END){
        ground.velocityX = 0;
cloudsGroup.setVelocityXEach(0)
obstaclesGroup.setVelocityXEach(0)
cloudsGroup.setLifetimeEach(-5)
obstaclesGroup.setLifetimeEach(-5)
  trex.changeAnimation("collided",trexCol_img)
  trex.velocityY=0;
  score=0;
     restart.visible=true
  gameover.visible=true
  if(mousePressedOver(restart)){
     reset();
     }
  
}

  

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(3+10*score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(4+10*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY
obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)

}
