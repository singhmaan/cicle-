var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cicleman,cicleman_running;
var cash,cash2,cashImage,cash2Image;
var clouds,cloudsImage;
var sun,sunImage;
var ground,groundImage;
var backgroundImg;
var cashScore = 0;
var Score =0;
var cashScore;
var coinScore;

function preload() {
  backgroundImg = loadImage("backgroundImg.png");

  jumpSound= loadSound("jump.wav");
  gameSound= loadSound("game.mp3");
  bellSound= loadSound("bell.mp3");
  gameOverSound= loadSound("gameOver.mp3");

  cicleman_running = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  cicleman_collided = loadAnimation("mainPlayer3.png");

  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
 
  cashImage = loadImage("cash.png");
  cash2Animation= loadImage("cash.png");

  coinImage = loadImage("coin.png");
  coin2Animation = loadImage("coin.png");

  
  sunAnimation = loadImage("sun.png")
  ghost_running = loadAnimation("ghost-jumping.png","ghost-standing.png");

   gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -6 ;

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,400);
  restart.addImage(restartImg);
  
  gameOver.scale = 2.2;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;

cash2 = createSprite(50,30,50,50);
cash2.addAnimation("cash",cashImage);
cash2.scale= 0.1;

coin2 = createSprite(150,28,50,50);
coin2.addAnimation("coin",coinImage)
coin2.scale=0.3;

sun = createSprite(width-200,100,10,10);
sun.addAnimation("sun", sunAnimation);
sun.scale = 0.4;

  

cicleman = createSprite(200,483,60,50);
cicleman.addAnimation("running",cicleman_running);
cicleman.addAnimation("collided",cicleman_collided);
cicleman.scale=0.1;
cicleman.setCollider('circle',0,0,550);
cicleman.debug = true;

cloudsGroup = new Group();
CashesGroup = new Group();
ghostsGroup = new Group();
coinsGroup = new Group();


cashScore = 0;
coinScore = 0;
Score =0;
}
function draw() {
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("c    "+ cashScore,60,35); 

  textSize(20);
  fill("black")
  text("C     "+ coinScore,140,35);

  textSize(20);
  fill("black")
  text("Score:"+ Score,230,35);

  if (gameState === PLAY) {
    Score = Score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*Score/100);

    

    if (keyDown("A")) {
      bellSound.play();
    }

   if (cicleman.isTouching(CashesGroup)) {
      CashesGroup.destroyEach();
      gameSound.play();
     
      cashScore=cashScore+50
    } 
   
    if (cicleman.isTouching(coinsGroup)) {
      coinsGroup.destroyEach();
      gameSound.play();
     
      coinScore=coinScore+1
    } 

    if((touches.length > 0 || keyDown("SPACE")) && cicleman.y  >= height-150) {
      jumpSound.play ();
      cicleman.velocityY = -17;
       touches = [];
    }

    cicleman.velocityY = cicleman.velocityY + 0.8

    cicleman.collide(ground);

    if (ground.x < 0){
      ground.x = ground.width/3;
    }

    if (cicleman.isTouching(ghostsGroup)) {
      gameOverSound.play();
      gameState = END;

    }
    spawnClouds();
    spawnCashes();
    spawnGhosts();
    spawnCoins();
  
   
  }

  else if(gameState === END){
    ground.velocityX= 0;
    
    cloudsGroup.setVelocityXEach(0);
    CashesGroup.setVelocityXEach(0);
    ghostsGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);

    ghostsGroup.destroyEach();
        cloudsGroup.destroyEach();
        CashesGroup.destroyEach();
        coinsGroup.destroyEach();

    cicleman.changeAnimation("collided",cicleman_collided);
    

    restart.visible=true;
    gameOver.visible=true;

    cicleman.collide(ground);

    if(mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }


  
  drawSprites()
}
function spawnClouds() {
 //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
  var cloud = createSprite(width+20,height-300,40,10);
  cloud.y = Math.round(random(40,250));
  cloud.addImage(cloudImage);
  cloud.scale = 1.0;
  cloud.velocityX = -3;

  
  
   //assign lifetime to the variable
  cloud.lifetime = 600;
  
  //adjust the depth
  cloud.depth = cicleman.depth;
  cicleman.depth = cicleman.depth+1;
  
  //add each cloud to the group
  cloudsGroup.add(cloud);
}
  }
  function spawnCashes() {
    //write code here to spawn the Cashes
    if (frameCount % 300 === 0) {
     var cash = createSprite(width+20,height-300,40,10);
     cash.y = Math.round(random(300,530));
     cash.addImage(cashImage);
     cash.scale = 0.2;
     cash.velocityX = -3;

     cash.velocityX = -(6 + 3*Score/100);
     
      //assign lifetime to the variable
     cash.lifetime = 600;

     cash.setCollider('circle',0,0,150);
     cash.debug=true;
     
     //adjust the depth
     cash.depth = cicleman.depth;
     cicleman.depth = cicleman.depth+1;
     
     //add each cloud to the group
     CashesGroup.add(cash);
   }
     }
     function spawnGhosts() {
      //write code here to spawn the Ghosts
      if (frameCount % 500 === 0) {
       var ghost = createSprite(width+20,height-300,40,10);
       ghost.y = Math.round(random(500,500));
       ghost.addAnimation("running",ghost_running);
       ghost.scale = 0.5;
       ghost.velocityX = -3;
  
       ghost.velocityX = -(6 + 3*Score/100);
       
        //assign lifetime to the variable
       ghost.lifetime = 600;

       ghost.setCollider('circle',0,0,70);
       ghost.debug=true;
       
       //adjust the depth
       ghost.depth = cicleman.depth;
       cicleman.depth = cicleman.depth+1;
       
       //add each cloud to the group
       ghostsGroup.add(ghost);
     }
       }

       function spawnCoins() {
        //write code here to spawn the Coins
        if (frameCount % 220 === 0) {
         var coin = createSprite(width+20,height-300,40,10);
         coin.y = Math.round(random(300,520));
         coin.addImage(coinImage);
         coin.scale = 0.5;
         coin.velocityX = -3;
    
         coin.velocityX = -(6 + 3*Score/100);
         
          //assign lifetime to the variable
         coin.lifetime = 600;
  
         coin.setCollider('circle',0,0,40);
         coin.debug=true;
         
         //adjust the depth
         coin.depth = cicleman.depth;
         cicleman.depth = cicleman.depth+1;
         
         //add each cloud to the group
         coinsGroup.add(coin);
       }
         }

         
         
        
       function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        ground.velocityX=0;
        ghostsGroup.destroyEach();
        cloudsGroup.destroyEach();
        CashesGroup.destroyEach();
        

        
        cicleman.changeAnimation("running",cicleman_running);
        
        Score = 0;
        cashScore=0;
        
      }