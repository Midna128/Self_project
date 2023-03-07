let ground;
let lander;
var lander_img;
var bg_img;

var asteroidGroup;
var asteroid_img;
var asteroid2_img;

var vx = 0;
var g = 0.05;
var vy = 0;
 var score = 0;
function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  asteroid_img = loadImage("Asteroid.png");
  asteroid2_img = loadImage("asteroid2.png");
  bullet_img = loadImage("bullet.png");

 
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(100,350,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.debug = true
  lander.setCollider("circle",0,0,100);
  // ground = createSprite(500,550,1000,10);
  // ground.visble = false;

  asteroidsGroup = new Group();
bulletsGroup = new Group();

  rectMode(CENTER);
  textSize(15);

}



function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  // text("Vertical Velocity: "+round(vy),800,75);
  pop();
  if(keyIsDown(UP_ARROW)){
    lander.y = lander.y-3;
  }
  if(keyIsDown(DOWN_ARROW)){
    lander.y = lander.y+3;
  }
  if(keyIsDown(RIGHT_ARROW)){
    lander.x = lander.x+3
  }
  if(keyIsDown(LEFT_ARROW)){
    lander.x = lander.x-3
  }
 spawnAsteroids();
 if(keyDown("space")){
  bullets();
 }
 if(bulletsGroup.isTouching(asteroidsGroup)){
  bulletsGroup.destroyEach();
  asteroidsGroup.destroyEach();
  score+=2;
 }
 


  //fall down
  
  // lander.position.y+=vy;
  // lander.collide(ground)
  drawSprites();
  fill("white");
  textSize(25);
  text("Score: "+score,800,50); 

  if(asteroidsGroup.collide(lander)){
    lander.destroy();
    asteroidsGroup.destroyEach();
    text("Game Over",500,300);
    
   }
}
function spawnAsteroids(){
if (frameCount % 55 === 0){
  var asteroid = createSprite(Math.round(random(50,950)),10,50,50);
  asteroid.velocityY = 4.5;
  
  var rand = Math.round(random(1,2));
  switch(rand){
    case 1:asteroid.addImage(asteroid_img);
    asteroid.scale = 0.3;
        break;
    case 2:asteroid.addImage(asteroid2_img);
    asteroid.scale = 0.7;
    break;
    default:break;
  }
  asteroid.lifetime = 300
asteroidsGroup.add(asteroid);
  
}

}
function bullets(){
  var bullet = createSprite(lander.x,lander.y,50,50);
  bullet.addImage(bullet_img);
  bullet.velocityY = -3;
  bullet.scale = 0.1;
  bulletsGroup.add(bullet);
}


