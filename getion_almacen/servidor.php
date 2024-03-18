<?php 
require "connectBD.php";
$resultadoBD = mysqli_query($conect, "SELECT * FROM familias");
$options = "";


while($row = mysqli_fetch_assoc($result)){
    $options .= "<option>";
    $options .= $row['nombre'];
    $options .= "</option>";
}

echo $options;
mysqli_close($conect);


?>