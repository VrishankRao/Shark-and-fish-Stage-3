//variables for platform, backgound, shark, ground
var platform,platformGroup,platformImg;
var bg;
var shark,sharkImg;
var ground;
var fish,fishImg,fishGroup;
var danger,dangerImg,dangerGroup;
var score;


function preload() {
  //loading background of ocean
  bg = loadImage("ocean.jpg");
  sharkImg = loadImage("shark.png");
  dangerImg = loadImage("danger.png");
  fishImg = loadImage("fish.png");

}

function setup() {
  createCanvas(800,400);

  //sprites for shark and ground
  shark = createSprite(400,350,20,50);
  shark.addImage(sharkImg);
  shark.scale = 0.35;

  ground = createSprite(400,390,800,20);
  ground.visible = false;

  platformGroup = new Group();
  dangerGroup = new Group();
  fishGroup = new Group();


  score = 0;
}

function draw() {
  background(bg);

  //spawning platforms at random positions
  if(frameCount % 80 === 0){
    platform = createSprite(random(100,700),0,60,10);
    platform.velocityY = 2;
    platform.velocityX = 0;
    platformGroup.add(platform);
  }

  if(frameCount % 100 === 0){
    danger = createSprite(random(50,750),0,50,10);
    danger.velocityY = 4;
    danger.addImage(dangerImg);
    danger.scale = 0.15;
    dangerGroup.add(danger);
  }

  if(frameCount % 80 === 0){
    fish = createSprite(platform.x,-10,50,10);
    fish.velocityY = 2;
    fishGroup.add(fish);
    fish.addImage(fishImg);
    fish.scale = 0.25;
  }

  if(shark.isTouching(fishGroup)){
    score = score+10;
    //fish.destroy();
  }

  //making shark jump
  if(keyDown("space")){
    shark.velocityY = -11;
  }

  //gravity for shark and making it collide with the ground
  shark.velocityY = shark.velocityY + 0.5;
  shark.collide(ground);

  //making shark move right
  if(keyWentDown("RIGHT_ARROW")){
    shark.velocityX = 6;
  }
  if(keyWentUp("RIGHT_ARROW")){
    shark.velocityX = 0;
  }
  
  //making shark move left
  if(keyWentDown("LEFT_ARROW")){
    shark.velocityX = -6;
  }
  if(keyWentUp("LEFT_ARROW")){
    shark.velocityX = 0;
  }

  

  //score display
  stroke("red");
  textSize(30);
  text("Score:"+score,50,50);
  

  //respawning shark
  if(shark.y < 0 || shark.x < 0 || shark.x > 800) {
    shark.x = 395;
    shark.y = 345;
    shark.velocityY = 0;
    shark.velocityX = 0;
  }

  if(shark.y === platformGroup.y-30){
    shark.velocityY = -5;
  }

  //displaying all sprites
  drawSprites();
  
}


