<?php


// Verificar si se ha recibido la solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se han recibido datos
    if (isset($_POST["parametro"])) {
        $parametro = $_POST["parametro"];
        
        require_once("connectBD.php");
        $cb = new conexion();
        $stmt = $cb->conect->prepare("SELECT * FROM familias WHERE columna = :parametro");
        $stmt->bindParam(':parametro', $parametro);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(array("error" => "No se recibieron datos adecuados"));
    }
} else {
    echo json_encode(array("error" => "Se esperaba una solicitud POST"));
}
