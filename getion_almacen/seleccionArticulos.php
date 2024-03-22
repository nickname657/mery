<?php
require_once("connectBD.php");
$ca = new conexion();


if (isset($_POST['id'])) {
    $idi = '1';


    $stmt = $ca->conect->prepare("SELECT * FROM articulos WHERE idFamilia=" . $idi);

    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $lista = [];
    foreach ($data as $value) {
        $encodeImg = base64_encode($value['foto']);
        $value['foto'] = $encodeImg;
        $lista[] = $value;
    }

    echo (json_encode($lista));
} else {
    echo "Error: Falta el nombre y/o apellidos en la solicitud.";
}
