<?php

require_once("connectBD.php");

$cb = new conexion();


$stmt = $cb->conect->prepare("SELECT nombre from customers ");

$resultado->execute();
$data = $resultado->fetchAll(PDO::FETCH_ASSOC);
print json_encode($data);
var_dump($data);


public function convertir(){
    $stm = $this->conect->query('SELECT * FROM almacen');
    $resultado = $stm->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($resultado);

    return $json;
}