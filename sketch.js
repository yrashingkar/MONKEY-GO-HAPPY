var wallPaper;
var monkey, monkey_running;
var backImage, ground;
var bananaImage, foodGroup;
var obstacleImage, obstacleGroup;
var score;
var touchCount;
var PLAY;
var END;
var gameState;

function preload() {
  backImage = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  score = 0;
  touchCount = 0;
  PLAY = 1;
  END = 0;
  gameState = 1;

  wallPaper = createSprite(400, 400, 20, 20);
  wallPaper.addImage("jungle.jpg", backImage);
  wallPaper.velocityX = 2;
  if (wallPaper.x < 200) {
    wallPaper.x = wallPaper.width / 2;
  }

  var foodGroup = createGroup(200, 200, 10, 10);
  var obstacleGroup = createGroup(200, 200, 10, 10);

  ground = createSprite(200, 380, 400, 10);
  ground.visible = false;

  monkey = createSprite(100, 350, 20, 20);
  monkey.scale = 0.1;
  monkey.addAnimation("Monkey", monkey_running);
}

function draw() {
  //background(220);

  if (gameState === PLAY) {

    monkey.collide(ground);
    
    if (keyDown("space")) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 2;
    }

    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }

    if (obstacleGroup.isTouching(monkey)) {

      switch (touchCount) {
        case 0:
          touchCount = touchCount + 1;
          monkey.scale = 0.1;
          break;
        case 1:
          gameState = END;
          break;
        default:
          break;
      }

    }

    if (gameState === END) {
      foodGroup.velocityX = 0;
      obstacleGroup.velocityX = 0;
      wallPaper.velocityX = 0;
    }



    if (wallPaper.x < 0) {
      wallPaper.x = wallPaper.width / 2;
    }

    Obstacle();
    food();
  }


  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}


function food() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400, 100, 10, 10);
    banana.y = randomNumber(120, 200);
    banana.setAnimation("Banana");
    banana.scale = 0.05;
    banana.velocityX = -8;
    banana.lifetime = 134;
    foodGroup.add(banana);
  }
}

function Obstacle() {
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(400, 365, 10, 40);
    obstacle.velocityX = -6;
    obstacle.setAnimation("Stone");
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    obstacleGroup.add(obstacle);
  }
}