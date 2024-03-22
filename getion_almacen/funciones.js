
let datosJson;
let idFamilia;

/* Programar una función desde la que se ejecuten los procesos necesarios
después de cargar la página html en memoria. */
$(document).ready(function () {
   initEvent();
});


function initEvent() {
   miXHR = new objetoXHR();
   cargarAsync("consulta.php");
   $('#listaFamilias').click(options(datosJson))




   $('#leerProductos').click(function () {
      console.log("entro aquiss");
      if (idFamilia === null) {
         console.log("???");
         alert("Seleccione una familia");
      } else if (idFamilia !== null) {
         console.log("heloooo");
         articulosSelec("id=" + idFamilia);
         lfar(datosJson);
      }
   });


   $('#listaFamilias').change(function () {
      var opcionSeleccionada = $(this).val();
      console.log("opction second" + opcionSeleccionada);
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
         console.log(datosJson);
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
         value: obj.nombreFamilia,
         text: obj.nombreFamilia
      });
      $('#listaFamilias').append(nuevoOption);
   });
}



/* Programar una función para el evento change de la <select>
que visualice en la etiqueta <input type="text" id="familiaSeleccionada" />
el nombre de la familia y la etiqueta <img src="" id="imagenFamilia" alt="Imagen Familia" />
la imagen, foto, de la familia seleccionada. */

function changeSelect(option, json) {

   console.log("option first: " + option);
   $('#listaFamilias').empty();


   var lg = json.length;
   for (let b = 0; b < lg; b++) {
      var tag = String(json[b].nombreFamilia);
      console.log(tag);
      if (option === tag) {
         idFamilia = String(json[b].nombreFamilia);
         $('#familiaSeleccionada').val(json[b].nombreFamilia);
         var imagen64 = "data:image/jpeg;base64," + json[b].foto;
         $('#imagenFamilia').attr('src', imagen64);
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


function articulosSelec(b) {
   if (miXHR) {
      miXHR.open('POST', 'seleccionArticulos.php', true);
      miXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      miXHR.onreadystatechange = estadoPeticion;
      miXHR.send(b);
   }
}

/* Con los datos Json obtenidos por la conexión asíncrona,
crear el código html necesario para que se visualicen en la etiqueta html
<article id="listaArticulos" class="header4" aquellos artículos
cuyo stock sea mayor que el stock mínimo. */


function lfar(dson) {

   $('#listaArticulos').empty();


   var lg = dson.length;
   for (let b = 0; b < lg; b++) {
      var t01 = dson[b].id;
      var t02 = String(dson[b].descripcion);
      var t03 = dson[b].precioCoste;
      var t04 = dson[b].precioVenta;
      var t05 = dson[b].stock;
      var t06 = dson[b].stockMin;
      var t07 = String(dson[b].foto);
      var ti64 = "data:image/jpeg;base64," + t07;

      console.log("?????????????" + t01);
      if (t05 > t06) {


         for (let cont = 1; cont < 8; cont++) {

            var newdiv = $('<div>');
            newdiv.addClass('desc');
            newdiv.text(t01);
            $('#listaArticulos').append(newdiv);
             
            var newdiv = $('<div>');
            newdiv.addClass('desc');
            newdiv.text(t02);
            $('#listaArticulos').append(newdiv);

            var newdiv = $('<div>');
            newdiv.addClass('desc');
            newdiv.text(t03);
            $('#listaArticulos').append(newdiv);

            var newdiv = $('<div>');
            newdiv.addClass('desc');
            newdiv.text(t04);
            $('#listaArticulos').append(newdiv);
            
         }
      
         
         // divnum = $('<div class="desc">' + t01 + '</div>');
         // // $('#imagenFamilia').attr('src', ti64);
         // $('#listaArticulos').append(divnum);
      }



   }

}

