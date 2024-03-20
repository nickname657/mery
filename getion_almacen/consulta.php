<?php

    require_once ("connectBD.php");
    $cb = new conexion();

    $stmt = $cb->conect->prepare("SELECT * FROM familias");

    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $lista = [];
    foreach ($data as $value) {
        $encodeImg = base64_encode($value['foto']);
        $value['foto'] = $encodeImg;
        $lista[] = $value;
    }

    echo (json_encode($lista));
?>
