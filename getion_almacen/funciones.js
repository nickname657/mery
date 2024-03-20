﻿/* Programar una función desde la que se ejecuten los procesos necesarios
después de cargar la página html en memoria. */
$(document).ready(function () {
   initEvent();
});


function initEvent() {
   iniciar();
   $('#leerProductos').click(options)
}

/* Crear una función en la cual una conexión asíncrona obtenga los datos de 
la tabla familia de la base de datos. */


function iniciar() {

   miXHR = new objetoXHR();
   cargarAsync("consulta.php");
}


function cargarAsync(url) {
   if (miXHR) {
       miXHR.open('POST', url, true);
       miXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       miXHR.onreadystatechange = estadoPeticion;
       miXHR.send();
   }
}


function estadoPeticion() {
   if (this.readyState == 4 && this.status == 200) {
       try {
           var resultados = JSON.parse(this.responseText);           
           console.log(resultados);
           
       } catch (error) {
           console.error("Error:", error.message);
       }
   }
}


function objetoXHR() {
   if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
   } else if (window.ActiveXObject) {
      var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0',
         'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
      for (var i = 0; i < versionesIE.length; i++) {
         try {
            return new ActiveXObject(versionesIE[i]);
         } catch (errorControlado) { } //Capturamos el error,
      }
   }
   throw new Error("No se pudo crear el objeto XMLHttpRequest");
}


/* Con los datos obtenidos en formato JSON añadir a la etiqueta
<select id="listaFamilias"> tantas <option> como registros tenga la tabla familias.
Cada <option> guarda el id de la familia, el nombre y la foto. */

function options(datos){


   console.log('Data received: ', datos);
   $.each(datos, function (obj) {
      var leng = obj.length;
  
      for (let a = 0; a < leng; a++) {
         $('#listaFamilias').append(obj[a].nombre + "<option>" + "</option>");

         var nuevoOption = $('<option>', {
            value: obj[a].nombre, 
            text: obj[a].nombre
         });
         $('#listaFamilias').append(nuevoOption);

      }
   });

   $('#listaFamilias')

}


/* Programar una función para el evento change de la <select>
que visualice en la etiqueta <input type="text" id="familiaSeleccionada" />
el nombre de la familia y la etiqueta <img src="" id="imagenFamilia" alt="Imagen Familia" />
la imagen, foto, de la familia seleccionada. */



/* Crear un evento que al hacer click en el botón,
<input type="button" id="leerProductos" value="Leer Productos Almacén por Familia" />.
En el evento creado programar una conexión asíncrona que ejecute el php
seleccionArticulos.php pasandole el id de la familia seleccionada en la <select>. */

/* Con los datos Json obtenidos por la conexión asíncrona,
crear el código html necesario para que se visualicen en la etiqueta html
<article id="listaArticulos" class="header4" aquellos artículos
cuyo stock sea mayor que el stock mínimo. */





