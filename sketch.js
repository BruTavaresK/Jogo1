var nave;
var inimigo_img;
var inimigo_group = [];
var tirosInimigosMatriz = [];
var frames = 300;
var edges;
var asteroide;
var asteroide_img;
var asteroide_group;
var asteroide_option;
var tiro;
var tiros = [];
var background_img;
var energia = 300;
var tiro2_img;
var armazenarTiros = 0;

function setup(){
  createCanvas(600,600);
  angleMode(DEGREES);
  nave = new Nave();
  asteroide_group = createGroup();
  edges = createEdgeSprites();
  
}

function preload(){
inimigo_img = loadImage("images/naveInimiga.png");
asteroide_img = loadImage("images/asteroide.png");
background_img = loadImage("images/background.png");
tiro2_img = loadImage("images/tiro.png");
}

function draw(){
  background(background_img); 
  nave.show();

  if(tirosInimigosMatriz[0] != null){
    for(var y = 0; y < tirosInimigosMatriz.length; y++){
      if(tirosInimigosMatriz[y].y > 610 || (tirosInimigosMatriz[y].y > -50 && tirosInimigosMatriz[y].y < -40)){
        tirosInimigosMatriz[y].y = 100;
        tirosInimigosMatriz[y].x = inimigo_group[y].x
      }
    }
  }

  if(inimigo_group[0] != null){

    tirosInimigos();

    for(var i = 0; i < inimigo_group.length; i++){



      inimigo_group[i].bounceOff(edges[0]);
      inimigo_group[i].bounceOff(edges[1]);
      inimigo_group[i].bounceOff(edges[2]);
      inimigo_group[i].bounceOff(edges[3]);

      if(inimigo_group[i].y >= 100){
        inimigo_group[i].velocityY = 0;
      }

    }
  }

  text(energia + "/300", 50,30);

  if(energia < 300){
    energia = energia + 1;
  }

  if(tiros.length >= 1){
    
  for(var i = 0; i < tiros.length; i++){
    if(tiros[i] !== undefined){
      tiros[i].show();

      if(tiros[i].y < 0){
        tiros.splice(i,1);
      }
    }
   }
  }
 
  if(keyDown("w") && energia >= 10){ 
    console.log("test");
    criarTiros();
    energia = energia - 10;
  }

  if(frameCount % 300 == 0){
    if(frames > 50){
      frames = frames - 25;
    }
  }

  if(keyDown("a") || keyDown("A")){
    

    if(nave.x > 1){
      nave.x = nave.x - 5;
    }
  }

  if(keyDown("d") || keyDown("D")){
    
    if(nave.x < 472){
      nave.x = nave.x + 5;
    }
  }


  colisaoTiroInimigo();
  drawSprites();
  inimigos();
  asteroides();
  colisaoAsteroide();

  for(var a = 0; a < asteroide_group.length; a++){
    if(asteroide_group[a] !== undefined){
      colisaoTiroAsteroide(a);
    }
  }


  for(var a = 0; a < inimigo_group.length; a++){
    if(inimigo_group[a] !== undefined){
      colisaoTiro(a);
    }
  }
}

function inimigos(){

  if(frameCount % frames === 0){

    var inimigo;

    inimigo = createSprite(285,-10);

    inimigo.x = Math.round(random(100,500));

    inimigo.addImage(inimigo_img);

    inimigo.velocityY = 5;
    
    if(Math.round(random(0,1)) == 0){
      inimigo.velocityX = 5;
    }
    else{
      inimigo.velocityX = -5;
    }

    inimigo.scale = - 0.6;

    inimigo_group.push(inimigo);
  }
}

function asteroides(){
  if(frameCount % frames === 0){

    asteroide = createSprite(-10,300);

    asteroide.scale = 0.1;

    asteroide.y = Math.round(random(100,400))

    asteroide.addImage(asteroide_img);

    asteroide_option = Math.round(random(0,1))

    if(asteroide_option == 0){
      asteroide.rotation = -110;

      asteroide.velocityX = 8;

      asteroide.x = -10;
    }

    else{
      asteroide.rotation = 0;

      asteroide.velocityX = -8;

      asteroide.x = 610;
    }

     asteroide.velocityY = 5;

    asteroide_group.add(asteroide);
  }
}

  function criarTiros(){
    var tiro = new Tiro(nave.x + 43);
    tiros.push(tiro);
  }

  function tirosInimigos(){

    if(tirosInimigosMatriz.length < inimigo_group.length){
    var tiro2;

    tiro2 = createSprite(100, 100);

    tiro2.x = inimigo_group[armazenarTiros].x;

    tiro2.addImage(tiro2_img);

    tiro2.velocityY = 8;

    tiro2.scale = -0.4;

    tirosInimigosMatriz.push(tiro2);

    armazenarTiros++;
    }
  }

  function colisaoTiroInimigo(){
    if(tirosInimigosMatriz.length >= 1){
      for(var i = 0; i < tirosInimigosMatriz.length; i++){
        if(tirosInimigosMatriz[i] !== undefined)
        if((tirosInimigosMatriz[i].x + 18 >= nave.x) && (nave.x + 100 >= tirosInimigosMatriz[i].x)){
          if((tirosInimigosMatriz[i].y + 26 >= nave.y) && (nave.y + 100 >= tirosInimigosMatriz[i].y)){
            tirosInimigosMatriz[i].y = -200;
            nave.health = nave.health - 1;
            console.log(nave.health);
          }
        }
      }
    }
  }

  function colisaoTiro(index){
    if(tiros.length >= 1){
      for(var i = 0; i < tiros.length; i++){
        if((tiros[i].x + 15 >= inimigo_group[index].x) && (inimigo_group[index].x + 77 >= tiros[i].x)){
          if((tiros[i].y + 30 >= inimigo_group[index].y) && (inimigo_group[index].y + 60 >= tiros[i].y)){
            //Usar o splice matriz.splice(i,1);
            console.log("teste tiro");
            inimigo_group.splice(index,1);
            tirosInimigosMatriz.splice(index,1);
            tiros.splice(i,1);
          }
        }
      }
    }
  }

  function colisaoAsteroide(){
    if(asteroide_group.length >= 1){
    for(var i = 0; i < asteroide_group.length; i++){
    if(asteroide_group[i] !== undefined){
    if((asteroide_group[i].x + 60 >= nave.x) && (nave.x + 100 >= asteroide_group[i].x)){
      if((asteroide_group[i].y + 90 >= nave.y) && (nave.y + 100 >= asteroide_group[i].y)){
        asteroide_group[i].y = -400;
        nave.health = nave.health - 1;
        console.log(nave.health);
      }
    }
   }
  }
 }
}

function colisaoTiroAsteroide(index){
  if(tiros.length >= 1){
    for(var i = 0; i < tiros.length; i++){
      if(tiros[i] !== undefined){
        if((tiros[i].x + 15 >= asteroide_group[index].x) && (asteroide_group[index].x + 60 >= tiros[i].x)){
          if((tiros[i].y + 30 >= asteroide_group[index].y) && (asteroide_group[index].y + 90 >= tiros[i].y)){
            console.log("teste asteroide");
            asteroide_group.splice(index,1);
            tiros.splice(i,1);
          }
        }
      }
    }
  }
}
      
