//Se inicializan variables en 0.
let numeroSecreto =0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 6;
let final = false;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    //Retorna el valor obtenido en la caja de texto.
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(numeroDeUsuario === numeroSecreto){
        //Uso de operador ternario para cambiar el texto de salida en base al número de intentos.
        asignarTextoElemento('p', `¡Acertaste! Lo hiciste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#iniciar').setAttribute('disabled', true);
        document.querySelector('#valorUsuario').setAttribute('disabled', true);
        //Condición para 'volver a jugar'
        if(listaNumerosSorteados.length == numeroMaximo && final == false){
            final = true;
        }
    } else {
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo )+ 1;
    //Verificar que el juego no genere numeros existentes.

    if(listaNumerosSorteados.length == numeroMaximo){
        //Si se alcanza el número máximo de juegos posibles
        //Se límpia la lista para volver a jugar
        //y entra en recursividad.
        listaNumerosSorteados = [];
        return generarNumeroSecreto();

    } else {
        if(listaNumerosSorteados.includes(numeroGenerado)){
            //si el numero generado está incluido en la lista, entra a la recursividad
            return generarNumeroSecreto(); //recursividad
        } else {
            //si el número generado no está incluido en la lista
            listaNumerosSorteados.push(numeroGenerado); //lo guarda
            return numeroGenerado; //devuelve el número generado
        }
    }
}

function limpiarCaja() {
   document.querySelector('#valorUsuario').value = '';
}

//Se asignan valores a las variables y las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número entre 1 y ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    
}

function reiniciarJuego() {
    //Verifica si se alcanzó el número máximo de juegos posibles
    if (listaNumerosSorteados.length == numeroMaximo && final == true){
        //Condición para 'volver a jugar'.
        asignarTextoElemento('h1', '¡LLegaste al final del juego!');
        asignarTextoElemento('p', 'Pulsa para volver a jugar.');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#iniciar').setAttribute('disabled', true);
        document.querySelector('#valorUsuario').setAttribute('disabled', true);
        final = false;
        limpiarCaja();
    } else {
        //Reinicia el juego.
        limpiarCaja();
        condicionesIniciales();
        document.querySelector('#reiniciar').setAttribute('disabled', true);
        document.querySelector('#iniciar').removeAttribute('disabled', true);
        document.querySelector('#valorUsuario').removeAttribute('disabled', true);
    }
}

condicionesIniciales();