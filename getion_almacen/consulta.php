<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Realizar la conexión a la base de datos
    require_once("connectBD.php");
    $cb = new conexion();
    
    // Preparar la consulta SQL para obtener todos los datos de la tabla
    $stmt = $cb->conect->prepare("SELECT * FROM familias");
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Obtener los datos y convertirlos a un formato JSON
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
} else {
    // Si no se recibió una solicitud POST, devolver un mensaje de error
    echo json_encode(array("error" => "Se esperaba una solicitud POST"));
}

?>

