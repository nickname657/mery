/* Programar una función desde la que se ejecuten los procesos necesarios
después de cargar la página html en memoria. */

/* Crear una función en la cual una conexión asíncrona obtenga los datos de 
la tabla familia de la base de datos. */

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


let datosJson;
let idFamilia;
let dataArticle;

function initEvent() {

   miXHR = new objetoXHR();
   cargarAsync("consulta.php");
   console.log(datosJson);
}



$(document).ready(function () {
   initEvent();
});





function listFamilis() {

   $('#listaFamilias').change(function () {
      var opcionSeleccionada = $(this).val();
      console.log("opcion seleccionada click listafamilias-------" + opcionSeleccionada);
      changeSelect(opcionSeleccionada, datosJson);

      $('#listaFamilias option').prop('selected', false);
      $('#listaFamilias option[value="' + opcionSeleccionada + '"]').prop('selected', true);

   });


}

function leerProducts() {
   $('#leerProductos').click(function () {
      if (idFamilia === null) {
         console.log("click leer productos if = null-------");
         alert("Seleccione una familia");
      } else if (idFamilia !== null) {
         console.log("id familia distinto de null-----");
         articulosSelec("id=" + idFamilia);
      }
   });
}








function cargarAsync(url) {
   if (miXHR) {
      miXHR.open('POST', url, true);
      miXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      miXHR.onreadystatechange = estadoPeticion;
      miXHR.send();
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




function estadoPeticion() {

   if (this.readyState == 4 && this.status == 200) {
      try {
         datosJson = JSON.parse(this.responseText);
         console.log("------objeto json-----");
         console.log(datosJson);
         console.log("------objeto json-----");
         options(datosJson);
      } catch (error) {
         console.error("Error:", error.message);
      }
   }
}




function options(datos) {
   $('#listaFamilias').empty();
   $.each(datos, function (index, obj) {

      var nuevoOption = $('<option>', {
         id: obj.id,
         value: obj.nombreFamilia,
         text: obj.nombreFamilia
      });
      nuevoOption.prop('selected', true);
      $('#listaFamilias').append(nuevoOption);
   });
}





function changeSelect(option, json) {

   var lg = json.length;
   for (let b = 0; b < lg; b++) {
      var tag = String(json[b].nombreFamilia);
      if (option === tag) {
         idFamilia = json[b].id;
         console.log("id de la familia-----------:"  + idFamilia);
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



function articulosSelec(b) {
   if (miXHR) {
      miXHR.open('POST', 'seleccionArticulos.php', true);
      miXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      miXHR.onreadystatechange = estadoPeticionArticulos;
      miXHR.send(b);
   }
}


function estadoPeticionArticulos() {

   if (this.readyState == 4 && this.status == 200) {
      try {
         dataArticle = JSON.parse(this.responseText);
         console.log("------objeto json-----");
         console.log(dataArticle);
         console.log("------objeto json-----");
         imprimirArticulo(dataArticle);

      } catch (error) {
         console.error("Error:", error.message);
      }
   }
}



function imprimirArticulo(json) {

   console.log("holow");
   $('#listaArticulos').empty();

   $.each(json, function (index, a) {

      var divlista = $('<div>');
      divlista.addClass('header5');
      $('#listaArticulos').append(divlista);

      var newdiv1 = $('<div>');
      newdiv1.addClass('desc');
      newdiv1.text(a.idfamilia);
      $('div.header5').append(newdiv1);

      var newdiv2 = $('<div>');
      newdiv2.addClass('desc');
      newdiv2.text(a.descripcion);
      $('div.header5').append(newdiv2);


   });

}












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

      console.log("ID articulo:" + t01);
      if (t05 > t06) {

         var divlista = $('<div>');
         divlista.addClass('header5');
         $('#listaArticulos').append(divlista);

         var newdiv1 = $('<div>');
         newdiv1.addClass('desc');
         newdiv1.text(t01);
         $('div.header5').append(newdiv1);

         var newdiv2 = $('<div>');
         newdiv2.addClass('desc');
         newdiv2.text(t02);
         $('div.header5').append(newdiv2);

         var newdiv3 = $('<div>');
         newdiv3.addClass('desc');
         newdiv3.text(t03);
         $('div.header5').append(newdiv3);

         var newdiv4 = $('<div>');
         newdiv4.addClass('desc');
         newdiv4.text(t04);
         $('div.header5').append(newdiv4);

         var newdiv5 = $('<div>');
         newdiv5.addClass('desc');
         newdiv5.text(t05);
         $('div.header5').append(newdiv5);

         var newdiv6 = $('<div>');
         newdiv6.addClass('desc');
         newdiv6.text(t06);
         $('div.header5').append(newdiv6);

         var newdiv7 = $('<div>');
         newdiv7.addClass('desc');
         newdiv7.text(ti64);
         $('div.header5').append(newdiv7);

         var newimg = $('<img>');
         newimg.attr('src', ti64);
         newimg.addClass('imgArticle');
         $('div.header5').append(newimg);




         // divnum = $('<div class="desc">' + t01 + '</div>');
         // // $('#imagenFamilia').attr('src', ti64);
         // $('#listaArticulos').append(divnum);
      }



   }

}

