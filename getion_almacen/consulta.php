<?php

require_once("connectBD.php");

$cb = new conexion();


$stmt = $cb->conect->prepare("SELECT * from familias ");

$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$resultado = json_encode($data);
return $resultado;
