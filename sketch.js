var player;
var friends;
var witch;
var logs;

var life=3;
var score =0;
var gameState;
var witchGroup,friendGroup,coinGroup;
var hmazeGroup;

var witchFrequency = 50;

var trophy,trophyImg;
var witchesImage, friendsImage,coinImage;

var loseSound;

var gameBackground,loseBackground,winBackground;


function preload(){
  trophyImg = loadImage ("Images/trophy.png");
  loseSound = loadSound("sounds/Lose.mp3");
  coinImage = loadImage("Images/coin.png");
  witchImg = loadImage("Images/witch.png");
  friend1 = loadImage("Images/child1.png");
  friend2 = loadImage("Images/child.png");
  friend3 = loadImage("Images/child2.png");
  friend4 = loadImage("Images/child3.png");
  friend5 = loadImage("Images/child4.png");
  winSound = loadSound("sounds/Victory.mp3");
  person = loadImage("Images/person.png");
  gameBackground = loadImage("Images/Play.jpeg")
  loseBackground = loadImage("Images/failure.jpg");
  winBackground = loadImage("Images/Victory.jpeg");


}
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createSprite(width/2, height - 50, 40, 40);
  player.addImage(person);
 player.scale = 0.3; 

  //The Maze Horizonatal Obstacles
  
  hmaze1 = createSprite(width/2-50, height -100, width-50, 10);
  hmaze2 = createSprite(width/2+50, height-200, width-50, 10);
  hmaze3 = createSprite(width/2-50, height-300, width-50, 10);
  hmaze4 = createSprite(width/2+50, height-400, width-50, 10);
  hmaze5 = createSprite(width/2-50, height-500, width-50, 10);
  hmaze6 = createSprite(width/2+50, height-600, width-50, 10);


  vmaze1 = createSprite(width/2-50, height -100, width-50, 15);
  vmaze2 = createSprite(width/2+50, height-200, width-50, 15);
  vmaze3 = createSprite(width/2-50, height-300, width-50, 15);
  vmaze4 = createSprite(width/2+50, height-400, width-50, 15);
  vmaze5 = createSprite(width/2-50, height-500, width-50, 15);
  vmaze6 = createSprite(width/2+50, height-600, width-50, 15);

  trophy = createSprite(width/2,30);
 
  //trophy.shapeColor = "turquoise";
  trophy.addImage(trophyImg);
  trophy.scale = 0.2;

  trophy.visible = false;

  //The maze Vertical Obstacles
/*
vmaze1 = createSprite(width/2-70,height/2,10,height/8);
vmaze2 = createSprite(width/2+70,height/2,10,height/8);
vmaze1 = createSprite(width/2-70,height/2,10,height/8);
vmaze2 = createSprite(width/2+70,height/2,10,height/8);
vmaze1 = createSprite(width/2-70,height/2,10,height/8);
vmaze2 = createSprite(width/2+70,height/2,10,height/8);
 */

 
 witchGroup = new Group();
 friendGroup=new Group();
 coinGroup = new Group();

hmazeGroup = new Group();
vmazeGroup = new Group();

 hmazeGroup.add(hmaze1);
 hmazeGroup.add(hmaze2);
 hmazeGroup.add(hmaze3);
 hmazeGroup.add(hmaze4);
 hmazeGroup.add(hmaze5);
 hmazeGroup.add(hmaze6); 

 hmazeGroup.setVisibleEach(false);


 vmazeGroup.add(vmaze1);
 vmazeGroup.add(vmaze2);
 vmazeGroup.add(vmaze3);
 vmazeGroup.add(vmaze4);
 vmazeGroup.add(vmaze5);
 vmazeGroup.add(vmaze6); 


  vmazeGroup.setColorEach("red");

 gameState = 0;
}



function draw() {
  
  var edges = createEdgeSprites();
  
if(gameState ===0){
  background(gameBackground); 
  player.collide(hmazeGroup);
  player.collide(edges);

  spawnFriends();
  spawnWitch(); 
 spawnCoins();

 if(vmazeGroup.isTouching(player)){
   player.setVelocity(0,0);
   witchFrequency = 5;
}else {
  witchFrequency = 50;
}

for(var i = 0;i<friendGroup.length;i++){
  if(friendGroup.get(i).isTouching(player)){
    friendGroup.get(i).destroy();
    score = score-2;
  }
}

  
  for(var i = 0;i<coinGroup.length;i++){
    if(coinGroup.get(i).isTouching(player)){
      coinGroup.get(i).destroy();
      score = score+1;
    }
  }

 for(var i = 0;i<witchGroup.length;i++){
    if(witchGroup.get(i).isTouching(player)){
      witchGroup.get(i).destroy();
      //score = score+1;
      player.x = width/2;
      player.y = height-50;
      life = life -1;
    } 
  }
  

  if(score >= 2){
    trophy.visible = true;
  
    if(player.isTouching(trophy)){
      gameState = 2;
      winSound.play();
    }
  }

  if(score < 0) {
   // gameState = 1; 
   // loseSound.play();
   score = 0;
  }

  if(life <=0){
      gameState = 1;
      loseSound.play();
  }

  if (keyDown (UP_ARROW) ){
    player.y = player.y - 10;
  }

  if (keyDown (DOWN_ARROW) ){
    player.y = player.y + 10;
  }

  if (keyDown (LEFT_ARROW) ){
    player.x = player.x - 10;
  }

  if (keyDown (RIGHT_ARROW) ){
    player.x = player.x + 10;
  }

  drawSprites();
}
else if(gameState ===1){
  background(loseBackground); 
textSize(60);
fill("Black");
text("Game Over, You Lose ", width/3-100, height/2);

}

else if(gameState ===2){
  background(winBackground); 
  textSize(70);
  fill("red");
  stroke("blue");
  text("Game Over, You Win!! ", width/2-200, height/2);
  
  }



textSize(30);
fill("red");
stroke(10, 200, 200);
text("Score: "+score , width-150,50);
text("Life: "+life,30,50);
}





function spawnFriends(){
  if (frameCount % 100 === 0){
friends = createSprite(random(10, width- 10), 0, 40, 40);
var rand = Math.round(random(1,5));

switch(rand){
  case 1: friends.addImage(friend1);break;
  case 2: friends.addImage(friend2);break;
  case 3: friends.addImage(friend3);break;
  case 4: friends.addImage(friend4);break;
  case 5: friends.addImage(friend5);break;
  default: break;
}


friends.scale = 0.3;
friends.veloctiyX = random (- 10, 10);
friends.velocityY = 3;
friends.lifetime = height/3;
//friends.debug = true;
friendGroup.add(friends);

  }
}

function spawnWitch(){

if (frameCount % witchFrequency === 0){
witch = createSprite(random (0, width- 15), 0, 40, 40);
//witch.shapeColor = "green";
  witch.addImage(witchImg);
  witch.scale = 0.2;
  witch.velocityX = random (-15, 10);
  witch.velocityY = 5;
  witch.lifetime = height/5;
  witchGroup.add(witch);

}

}

function spawnCoins(){
  if(frameCount % 80 === 0){
    var coin = createSprite(random(10, width- 30), random(10, height- 10),20,20);
  //  coin.shapeColor = "yellow";
 
  coin.addImage(coinImage);
  coin.scale = 0.1;
    coin.lifetime = 250;
    coinGroup.add(coin);
  }
}

