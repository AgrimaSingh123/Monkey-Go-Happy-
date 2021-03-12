
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime,gameOver,restart;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  monkey_touched=loadAnimation("sprite_0.png");
}



function setup() {
  console.log("Welcome to Monkey Go Happy game!");
  survivalTime=0;
  
  createCanvas(400,400);
  
  ground=createSprite(200,390,400,100);
  ground.shapeColor="green";
  
  monkey=createSprite(50,300,20,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("touched",monkey_touched);
  monkey.scale=0.1;
  
  gameOver=createSprite(200,80,10,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  
  restart=createSprite(200,110,10,20);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("skyBlue");
  
  if(gameState==="play"){

  //enable the player to jump the monkey    
  if(keyDown("space")&&monkey.y>=300){
    monkey.velocityY=-15;
  };

    gameOver.visible=false;
    restart.visible=false;
 
  //survival time
survivalTime=Math.ceil(frameCount/frameRate());

  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach(); 
  }
  
  //declaring functions
  spawnObstacles();
  makeBananas();
    
    if(monkey.isTouching(obstacleGroup)){
      gameState="end";
    }
  }
  
  
  if(gameState==="end"){
 
  monkey.changeAnimation("touched",monkey_touched);    
    
    gameOver.visible=true;
    restart.visible=true; 
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
//neutral

  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);  

  
  stroke("black");
  textSize(20);
  fill("white");  
  text("Survival Time: "+survivalTime,135,50);
  drawSprites(); 
}

function reset(){
  gameState="play";
  monkey.changeAnimation("running",monkey_running);
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score=0;
}

function makeBananas(){
  if(World.frameCount%80===0){
  banana=createSprite(400,200,20,10);
  banana.addImage(bananaImage);
  banana.velocityX=-4;
  banana.scale=0.1;
  banana.y=Math.round(random(120,200));
  banana.lifetime=100;
  foodGroup.add(banana);
}
}

function spawnObstacles(){
  if(World.frameCount%300===0){
    obstacle=createSprite(400,326,20,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.08;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
}
