
let datosJson;

/* Programar una función desde la que se ejecuten los procesos necesarios
después de cargar la página html en memoria. */
$(document).ready(function () {
   initEvent();
});


function initEvent() {
   miXHR = new objetoXHR();
   cargarAsync("consulta.php");
   $('#listaFamilias').click(options(datosJson))
   $('#listaFamilias').change(function () {
      var opcionSeleccionada = $(this).val();
      console.log("?????" + opcionSeleccionada);
      changeSelect(opcionSeleccionada, datosJson);
   });
}

/* Crear una función en la cual una conexión asíncrona obtenga los datos de 
la tabla familia de la base de datos. */



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
         datosJson = JSON.parse(this.responseText);           
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

function options(datos) {
   $('#listaFamilias').empty(); 

   $.each(datos, function (index, obj) {
      
         var nuevoOption = $('<option>', {
            id: obj.id,
            value: obj.nombre,
            text: obj.nombre
      });
      $('#listaFamilias').append(nuevoOption);
   });
}



/* Programar una función para el evento change de la <select>
que visualice en la etiqueta <input type="text" id="familiaSeleccionada" />
el nombre de la familia y la etiqueta <img src="" id="imagenFamilia" alt="Imagen Familia" />
la imagen, foto, de la familia seleccionada. */

function changeSelect(option , json){

   console.log("que es esoooo: " + option);
   $('#listaFamilias').empty(); 


   var lg = json.length;
   for (let b = 0; b < lg; b++) {
      var tag = String(json[b].nombre);
      if (option === tag) {
         $('#familiaSeleccionada').val(json[b].nombre);
      } else if (option === "null") {
         $('#familiaSeleccionada').empty();
      }
   }

  
   $.each(json, function (index, o) {
      
      $('#familiaSeleccionada').append(o.nombre);
   });

}


/* Crear un evento que al hacer click en el botón,
<input type="button" id="leerProductos" value="Leer Productos Almacén por Familia" />.
En el evento creado programar una conexión asíncrona que ejecute el php
seleccionArticulos.php pasandole el id de la familia seleccionada en la <select>. */

/* Con los datos Json obtenidos por la conexión asíncrona,
crear el código html necesario para que se visualicen en la etiqueta html
<article id="listaArticulos" class="header4" aquellos artículos
cuyo stock sea mayor que el stock mínimo. */





