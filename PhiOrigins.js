

// Variables Globales

var NumRadio = 0.2; // def = 0.75 ó 0.2
var PrecisionSpeed = 1000; // More = Slow
var experimental = 1; // 1 = Uso de metodos matematicos 0 = original
var magic = Random(0,100000000000);
var stop = true;
var grosor = 0.5;
var red = 0;
var green = 0;
var blue = 0;
var ChangeColor_ratio = 0;
var ChangeColor_i = 0;
var Size, SizeSpiral,memopathX, memopathY;
var miscolores = 'rgba(255,255,255, 1)';






var IntervalSpeed = 0.1 * Height;
var Phi = (1 + Math.sqrt(5)) / 2;




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
  magic = Random(0,100000000000);
  draw();
}

function ManualSeed(){
  magic = parseInt(document.getElementById("seed").value);
}

function ActualizarNumeros(){
    var a = document.getElementById('Numeros');
    a.innerHTML =  '<input type="number" id="seed" value="' + magic + '">';
}


function teclado(event) {
  var x = event.which;
  if (x == 97){ Height = Height + 50; } // Tecla A
  if (x == 115){ Height = Height - 50; } // Tecla S
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
    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);
    //var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    //return '#'+decColor.toString(16).substr(1);
    return 'rgba(' +red+','+green+','+blue+', 1)';
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

function draw()
{
  ActualizarNumeros();
  Size = document.getElementById("size").value; // def = 0.6 ó 2
  if (stop){var grosor = (document.getElementById("grosor").value / 10);}
  else {var grosor = (document.getElementById("grosor").value / 10);}
  SizeSpiral = Size * Height;
  magic = parseFloat(document.getElementById("seed").value) + (Phi / PrecisionSpeed); // Animation
  var canvas = document.getElementById('spiral');
  var context = canvas.getContext("2d");
  var radio = 0.75;
  var angulo = (Phi * magic) / 50;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = grosor;
  context.lineJoin="round";
  memopathX = canvas.width / 2;
  memopathY = canvas.height / 2;


  for (var n = 0; n < SizeSpiral; n++) {
    radio += NumRadio;
    angulo += (Phi * magic) / 50;
    if (document.getElementById("experimental").checked){
      angulo = angulo + Math.log10(angulo);  // cbrt log log10 clz32  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
    }
    var x = canvas.width / 2 + LargoX(radio,angulo);
    var y = canvas.height / 2 + AltoY(radio,angulo);
    context.beginPath();
    context.moveTo(memopathX, memopathY);
    context.lineTo(x, y);
    memopathX = x;
    memopathY = y;


    if (n==200){miscolores = RandomColor();}
    if (n==400){miscolores = RandomColor();}
    if (n==600){miscolores = RandomColor();}
    if (n==800){miscolores = RandomColor();}
    if (n==1000){miscolores = RandomColor();}

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
