// Getting 'Info' div in js hands
var info = document.getElementById('info');
var mouseY = 0;
var mouseX = 0;


// Variables Globales

var zoom = 0.2; // def = 0.75 ó 0.2 Acercamiento real a la espiral.
var PrecisionSpeed = 50000 / 100000; // More = Slow
var experimental = 1; // 1 = Uso de metodos matematicos 0 = original
var seed = Random(0,100000000000);
var stop = false;
var grosor = 0.5;
var red = 0;
var green = 0;
var blue = 0;
var ChangeColor_ratio = 0;
var ChangeColor_i = 0;
var Size, SizeSpiral,memopathX, memopathY;
var miscolores = 'rgba(255,255,255, 1)';
var Chochou = 0;
var color200 = 'rgba(255,255,255, 1)';
var color400 = 'rgba(255,255,255, 1)';
var color600 = 'rgba(255,255,255, 1)';
var color800 = 'rgba(255,255,255, 1)';
var color1000 = 'rgba(255,255,255, 1)';
var NumLog = 10;
color200 = 'rgba(255,255,255, 1)';
color400 = 'rgba(255,255,255, 1)';
color600 = 'rgba(255,255,255, 1)';
color800 = 'rgba(255,255,255, 1)';
color1000 = 'rgba(255,255,255, 1)';




var IntervalSpeed = 0.1 * Height;



document.body.style.background=color;
var b = document.getElementById('Canvas');
b.innerHTML = '<canvas width="'+Width+'" height="'+Height+'" id="spiral" style="background: '+color+'"></canvas>';




// Estas funciones definen la perspectiva

function LargoX(a,b){
  var numeroRadio = a;
  var numeroAngulo = Math.cos(b); // Def = Math.cos
  if (document.getElementById("XdivOrmult").checked){
    var numero = numeroRadio / numeroAngulo;
  } else {
    var numero = numeroRadio * numeroAngulo; //Def = * Int= /
  }
  return numero;
}

function AltoY(a,b){
  var numeroRadio = a;
  var numeroAngulo = Math.sin(b); // Def = Math.sin
  if (document.getElementById("YdivOrmult").checked){
    var numero = numeroRadio / numeroAngulo;
  } else {
    var numero = numeroRadio * numeroAngulo; //Def = * Int= /
  }
  return numero;
}

function Actualizar(){
  seed = Random(0,100000000000);
  draw();
}

function ManualSeed(){
  seed = parseInt(document.getElementById("seed").value);
}

function ActualizarNumeros(){
    var a = document.getElementById('Numeros');
    a.innerHTML =  '<input type="number" id="seed" value="' + seed + '">';
}


function teclado(event) {
  var x = event.key;
  if (x == "a"){ Height = Height + 50; } // Tecla A
  if (x == "s"){ Height = Height - 50; } // Tecla S
  if (x == "q"){ PrecisionSpeed = PrecisionSpeed * 5; } // Tecla A
  if (x == "w"){ PrecisionSpeed = PrecisionSpeed / 5; } // Tecla S
  if (x == "e"){ Chochou = ++Chochou; } // Tecla A
  if (x == "r"){ Chochou = --Chochou; } // Tecla S
  if (x == "t"){ NumLog++; } // Tecla A
  if (x == "y"){ NumLog--; } // Tecla S
  if (x == "z"){ color200 = RandomColor();
                color400 = RandomColor();
                color600 = RandomColor();
                color800 = RandomColor();
                color1000 = RandomColor(); } // Tecla S
  if (x == "x"){ color200 = 'rgba(255,255,255, 1)';
                color400 = 'rgba(255,255,255, 1)';
                color600 = 'rgba(255,255,255, 1)';
                color800 = 'rgba(255,255,255, 1)';
                color1000 = 'rgba(255,255,255, 1)'; } // Tecla S
  draw();
}

function Stop(){
  if (stop == false) {
    stop = true;
  } else {
    stop = false;
  }
}


function animation(){
  if (stop == false) {
    draw();
  }
}


function RandomColor()
{
    red = Math.floor(Math.random() * 255) + 1;
    green = Math.floor(Math.random() * 255) + 1;
    blue = Math.floor(Math.random() * 255) + 1;
    //var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    //return '#'+decColor.toString(16).substr(1);
    return 'rgba(' +red+','+green+','+blue+', 1)';
}

function myFunction(choice) {
  Chochou = choice;
  draw();
}

function TipoExperimento(b) // cbrt log log10 clz32 floor https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
{
  if (Chochou == 0){return Math.log(b) / Math.log(NumLog);}
  else if (Chochou == 1){return Math.cbrt(b);}
  else if (Chochou == 2){return Math.log(b);}
  else if (Chochou == 3){return Math.clz32(b);}
  else if (Chochou == 4){return Math.floor(b);}
  else if (Chochou == 5){return Math.sqrt(b);} // mismo que 2
  else if (Chochou == 6){return b*b;}
  else if (Chochou == 7){return b*Math.random();} // no existe
  else if (Chochou == 8){return Math.tanh(b);}
}

function ChangeColor()
{
    if (ChangeColor_i == SizeSpiral){ ChangeColor_i = 0; }
    ChangeColor_ratio = ChangeColor_i/SizeSpiral;
    red = 256*ChangeColor_ratio;
    green = 256*ChangeColor_ratio;
    blue = 256*ChangeColor_ratio;
    ChangeColor_i++;
    //var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    //return '#'+decColor.toString(16).substr(1);
    console.log('rgba(' +red.toFixed()+','+green.toFixed()+','+blue.toFixed()+', 1)');
    return 'rgba(' +red.toFixed()+','+green.toFixed()+','+blue.toFixed()+', 1)';
}



// Creating function that will tell the position of cursor
// PageX and PageY will getting position values and show them in P
function tellPos(p){
  info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
  mouseY = p.pageY;
  mouseX = p.pageX;
  if (mouseY/Height <= 0.9) {
  PrecisionSpeed = Math.pow(1-(mouseY/(Height*0.9)), 3);} else {
    PrecisionSpeed = -Math.pow((mouseY-Height*0.9)/(Height-Height*0.9), 5)/10;
  }
}
addEventListener('mousemove', tellPos, false);



function draw()
{
  ActualizarNumeros();
  Size = document.getElementById("size").value; // def = 0.6 ó 2
  var grosor = (document.getElementById("grosor").value / 10);
  SizeSpiral = Size * Height;
  seed = parseFloat(document.getElementById("seed").value) + PrecisionSpeed; // Animation
  var canvas = document.getElementById('spiral');
  var context = canvas.getContext("2d");
  var radio = 0.75;
  var angulo = seed / 50;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = grosor;
  context.lineJoin="round";
  memopathX = canvas.width / 2;
  memopathY = canvas.height / 2;


  for (var n = 0; n < SizeSpiral; n++) {
    radio += zoom;
    angulo += seed / 50;

    angulo = angulo + TipoExperimento(angulo);

    var x = canvas.width / 2 + LargoX(radio,angulo);
    var y = canvas.height / 2 + AltoY(radio,angulo);
    context.beginPath();
    context.moveTo(memopathX, memopathY);
    context.lineTo(x, y);
    memopathX = x;
    memopathY = y;

    if (n==200){miscolores = color200;}
    if (n==400){miscolores = color400;}
    if (n==600){miscolores = color600;}
    if (n==800){miscolores = color800;}
    if (n==1000){miscolores = color1000;}

//    if (stop) {
  //    var miscolores = RandomColor();
      context.strokeStyle = miscolores;
      context.fillStyle = miscolores;
      context.stroke();
  //  }
  }

  if (contraste == 1){
    context.fillStyle = '#000'; // verde
    context.fill();
  }

if (stop == false) {context.stroke();}



}

draw();

 setInterval("animation()",IntervalSpeed);
