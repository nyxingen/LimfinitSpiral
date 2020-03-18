// Fijos
var Width = window.innerWidth-20;
var Height = window.innerHeight-20;
var contraste = 0; // 1 = Fondo blanco 0 = Fondo negro
var color = "black"
var Phi = (1 + Math.sqrt(5)) / 2;


if (contraste == 1){
  color = "white";
}


//Random
function Random(min, max)
{
    var numero = Math.floor( Math.random() * (max - min + 1) + min );
    return numero;
}
