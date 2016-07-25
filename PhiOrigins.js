

// Variables

var Size = 2; // def = 0.6 ó 2
var NumRadio = 0.2; // def = 0.75 ó 0.2
var contraste = 0; // 1 = Fondo blanco 0 = Fondo negro
var PrecisionSpeed = 1000; // More = Slow
var experimental = 0; // 1 = Uso de metodos matematicos 0 = original
var magic = Random(0,100000000000);




// Fijos

var Width = window.innerWidth-20;
var Height =window.innerHeight-20;
var SizeSpiral = Size * Height;
var IntervalSpeed = 0.1 * Height;
var Phi = (1 + Math.sqrt(5)) / 2;
var color = "black"
if (contraste == 1){
  color = "white";
}



document.body.style.background=color;
var a = document.getElementById('Notificaciones'); // Para mostrar datos
var b = document.getElementById('Canvas');
b.innerHTML = '<canvas width="'+Width+'" height="'+Height+'" id="spiral" style="background: '+color+'"></canvas>';

function Random(min, max)
{
    var numero = Math.floor( Math.random() * (max - min + 1) + min );
    return numero;
}



// Estas funciones definen la perspectiva

function LargoX(a,b){
  var numeroRadio = a;
  var numeroAngulo = Math.cos(b); // Def = Math.cos
  var numero = numeroRadio / numeroAngulo; //Def = * Int= /
  return numero;
}

function AltoY(a,b){
  var numeroRadio = a;
  var numeroAngulo = Math.sin(b) * Math.cos(b); // Def = Math.sin
  var numero = numeroRadio * numeroAngulo;
  return numero;
}

function Actualizar(){
  magic = Random(0,100000000000);
}

function ActualizarNumeros(){
    var AcNu = document.getElementById('Numeros');
    AcNu.innerHTML =  magic.toFixed(2);
}

function start()
{

  magic = magic + (Phi / PrecisionSpeed);
  var canvas = document.getElementById('spiral');
  var context = canvas.getContext("2d");
  var radio = 0.75;
  var angulo = (Phi * magic) / 50;
  if (experimental == 1){
    magic = magic + (Math.clz32(magic)/PrecisionSpeed); // cbrt log log10 clz32  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 1;
  context.lineJoin="round";
  context.strokeStyle = "#FFFFFF";
  context.beginPath();
  context.moveTo(canvas.width / 2, canvas.height / 2);

  for (var n = 0; n < SizeSpiral; n++) {
    radio += NumRadio;
    angulo += (Phi * magic) / 50;
    if (experimental == 1){
      angulo = angulo + Math.log10(angulo);
    }
    var x = canvas.width / 2 + LargoX(radio,angulo);
    var y = canvas.height / 2 + AltoY(radio,angulo);
    context.lineTo(x, y);
  }

  if (contraste == 1){
    context.fillStyle = '#000'; // verde
    context.fill();
  }
  context.stroke();

  //a.innerHTML = magic;

  ActualizarNumeros();

}


setInterval("start()",IntervalSpeed);
