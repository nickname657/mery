$(document).ready(showCatalog)


function initEvent() {
   $('#enviark').click(showCatalog)
}
/* Programar una función desde la que se ejecuten los procesos necesarios
después de cargar la página html en memoria. */


/* Crear una función en la cual una conexión asíncrona obtenga los datos de 
la tabla familia de la base de datos. */

function cargaasinc() {
   $("#leerProductos").click(function () {
      $.ajax({
         url: "consulta.php",
         type: "POST",
         dataType: "json",
         succes: function (data) {
            console.log(data);
         }
      });
   });

}

function iniciar() {

   miXHR = new objetoXHR();
   cargarAsync("consulta.php");
   
}

function cargarAsync(url) {
   if (miXHR) {
      document.getElementById("indicador").innerHTML = "<i mg src='ajax-loader.gif'/>";
      miXHR.open('GET', url, true);
      miXHR.onreadystatechange = estadoPeticion;
      miXHR.send(null);
   }
}
function estadoPeticion() {
   if (this.readyState == 4 && this.status == 200) {
      document.getElementById("indicador").innerHTML = "";
      textoDIV(document.getElementById("resultados"), this.responseText);
   }
}

/* Con los datos obtenidos en formato JSON añadir a la etiqueta
<select id="listaFamilias"> tantas <option> como registros tenga la tabla familias.
Cada <option> guarda el id de la familia, el nombre y la foto. */



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





