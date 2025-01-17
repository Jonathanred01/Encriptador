//Declaración de variables
//Elementos del documento
var cajaDeTexto = document.querySelector("#texto");
var transcripcion = document.querySelector("#transcripcion");
var textoEncriptado = document.querySelector("#encriptado");
var textosResultantes = document.querySelector("#resultados");

//Variables de uso
var acentos = ['á', 'é', 'í', 'ó', 'ú', 'ä', 'ë', 'ï', 'ö', 'ü', 'à', 'è', 'ì', 'ò', 'ù'];
var vocales = ['a', 'e', 'i', 'o', 'u'];
var codigos = ['ai', 'enter', 'imes', 'ober', 'ufat'];

//Funciones alternas
function normalizar(texto) {
   texto = texto.toLowerCase().trim();
   let caracter = '';
   let nuevoTexto = '';

   for (let letra = 0; letra < texto.length; letra++) {
      for (let acento = 0; acento < acentos.length; acento++) {
         //Determina si existe un acento
         let ocurrencia = texto[letra] == acentos[acento] || texto[letra] == acentos[acento].toUpperCase();

         if (ocurrencia) {
            if (acento < vocales.length) {
               caracter = vocales[acento];
               break;
            } else {
               caracter = vocales[acento-5];
               break;
            }
         } else {
            caracter = texto[letra];
         }
      }
      nuevoTexto += caracter;
   }

   return nuevoTexto;
}

function encriptar(texto){
   let caracter = '';
   let nuevoTexto = '';

   for (let letra = 0; letra < texto.length; letra++) {
      for (let vocal = 0; vocal < vocales.length; vocal++) {
         //Determina si existe una vocal
         let ocurrencia = texto[letra] == vocales[vocal];

         if (ocurrencia) {
            caracter = codigos[vocal];
            break;
         } else {
            caracter = texto[letra];
         }
      }
      nuevoTexto += caracter;
   }

   return nuevoTexto;
}

function desencriptar(texto) {
   let nuevoTexto = '';
   let letra = 0

   do {
      nuevoTexto += texto[letra];
      for (let codigo = 0; codigo < codigos.length; codigo++){
         if(nuevoTexto.includes(codigos[codigo])){
            nuevoTexto = nuevoTexto.replace(codigos[codigo], vocales[codigo]);
         }
      }
      letra++;
   } while (letra < texto.length);

   for (let codigo = 0; codigo < codigos.length; codigo++){
      if(nuevoTexto.includes('ames')){
         nuevoTexto = nuevoTexto.replace('ames', 'ai');
      }
   }

   return nuevoTexto;
}

//Funciones de evento click
function encriptarClick() {
   let texto = cajaDeTexto.value;
   let textoNormalizado = normalizar(texto);

   if (textoNormalizado != ""){
      let nuevoTexto = encriptar(textoNormalizado);

      //Ocultar el mensaje predeterminado de la transcripción
      transcripcion.classList = 'ocultar';
      textoEncriptado.classList = 'mostrar';

      //Crear un elemento con la respuesta
      let div = document.createElement('div');
      div.className = 'resultadoEncriptacion';

      let parrafo = document.createElement('p');
      parrafo.innerHTML = '"' + nuevoTexto + '"';

      let botonCopiar = document.createElement('i');
      botonCopiar.classList = 'bx bx-copy';
      botonCopiar.setAttribute("onclick", "copiar(this)" );

      div.append(parrafo);
      div.append(botonCopiar);
      textosResultantes.append(div);
   }

   cajaDeTexto.value = 'Ingrese el texto aquí';
}

function desencriptarClick() {
   let texto = cajaDeTexto.value;
   let textoNormalizado = normalizar(texto);

   if (textoNormalizado != ""){
      let nuevoTexto = desencriptar(textoNormalizado);

      //Ocultar el mensaje predeterminado de la transcripción
      transcripcion.classList = 'ocultar';
      textoEncriptado.classList = 'mostrar';

      //Crear un elemento con la respuesta
      let div = document.createElement('div');
      div.className = 'resultadoEncriptacion';

      let parrafo = document.createElement('p');
      parrafo.innerHTML = '"' + nuevoTexto + '"';

      let botonCopiar = document.createElement('i');
      botonCopiar.classList = 'bx bx-copy';
      botonCopiar.setAttribute("onclick", "copiar(this)" );

      div.append(parrafo);
      div.append(botonCopiar);
      textosResultantes.append(div);
   }

   cajaDeTexto.value = 'Ingrese el texto aquí';
}

function copiar(boton) {
   let contenedor = boton.parentNode;
   let parrafo = contenedor.querySelector('p');
   let texto = parrafo.innerHTML;

   for (const letra in texto) {
      if (texto[letra] == '"'){
         texto = texto.replace('"', '');
      }
   }

   navigator.clipboard.writeText(texto);
}

function limpiar(){
   let divs = textosResultantes.getElementsByClassName('resultadoEncriptacion');
   let i = divs.length - 1;

   do {
      textosResultantes.removeChild(divs[i]);
      i--;
   } while (i >= 0);

   transcripcion.classList = 'mostrar';
   textoEncriptado.classList = 'ocultar';
}
