<?php

require_once("connectBD.php");

$cb = new conexion();


$stmt = $cb->conect->prepare("SELECT nombre from customers ");

$resultado->execute();
$data = $resultado->fetchAll(PDO::FETCH_ASSOC);
print json_encode($data);
var_dump($data);