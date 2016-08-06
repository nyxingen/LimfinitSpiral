var dibujo, canvas, MoveX, MoveY, PosiX, PosiY, Width, Height,memopathX, memopathY;
var b = document.getElementById('Canvaso'); // Para mostrar datos
var a = document.getElementById('Notificaciones');
var iteraciones = 0;
Width = window.innerWidth - 200;
Height = window.innerHeight - 200;
var miscolores = 'rgba(255,255,255, 1)';


function Random(minimo, maximo)
{
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}

var numero = 1;
var x = 400;
var y = 400;
var movimiento = 5;
var velocidad = 0.00001;

var minimomo = 0;
var maximomo = 800;


function MoverFoco(){
  minimomo = Random(0,800);
  maximomo = Random(minimomo,800);
}

function inicio()
{

  b.innerHTML = "<canvas width='"+Width+"' height='"+Height+"' id='dibujito'></canvas>";
  alert("Hola"); // Para ver que todo funciona

  dibujo = document.getElementById("dibujito");   //Indispensable
  canvas = dibujo.getContext("2d");   //Indispensable
  canvas.strokeStyle = RandomColor(); //COLOR
  canvas.lineJoin="round"; //Redondea las esquinas
  memopathX = canvas.width / 2;
  memopathY = canvas.height / 2;


}


function RandomColor()
{
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    //var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    //return '#'+decColor.toString(16).substr(1);
    return 'rgba(' +red+','+green+','+blue+', 1)';
}


function adios()
{
  //LOCURA MAXIMA DE GRADIENTES !!
  // var gradient=canvas.createLinearGradient(0,0,Random(100,600),0);
  // gradient.addColorStop("0","magenta");
  // gradient.addColorStop("0.5","blue");
  // gradient.addColorStop("1.0","red");
  //
  // canvas.strokeStyle = gradient;
  // canvas.lineWidth=Random(1,10);


  numero = numero + 1;

  MoveX = Random(0,1);
  MoveY = Random(0,1);

  PosiX = Random(1,movimiento);
  PosiY = Random(1,movimiento);

  //alert(" " + numero + " " + x + " " + y );


  //Dibujando

 if (MoveX == 1 && x <= maximomo || x <= minimomo){
   x = x + PosiX;
 } else {
   x = x - PosiX;
 }

 if (MoveY == 1 && y <= maximomo || y <= minimomo){
   y = y + PosiY;
 } else {
   y = y - PosiY;
 }
  canvas.beginPath();
  canvas.strokeStyle = RandomColor();
  canvas.moveTo(memopathX, memopathY);
  canvas.lineTo(x,y);
  canvas.lineWidth = Random(0.01,1);
  var strokeOno = Random(0,1);
  if (strokeOno == 1) {canvas.stroke();}
  memopathX = x;
  memopathY = y;
  //Mostramos los numeros

  Width = window.innerWidth;
  Height = window.innerHeight;
  iteraciones += 1;
  a.innerHTML = "X:" + MoveX + " Y:" + MoveY + " PosiY:" + PosiY + " PosiX:" + PosiX + " Height:" + Height + " Width:" + Width + " I:" + iteraciones;


}

setInterval("adios()",velocidad);
//setInterval("MoverFoco()",1000);  //Sólo tira rayas de esquina a esquina
