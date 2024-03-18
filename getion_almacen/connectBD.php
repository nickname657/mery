<?php

class conexion
{
    public $conect;
    public function __construct() {
         $dsn = "mysql:host=localhost;dbname=bikes";
         $usuario = "root";
         $contrasena = "";
         $dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
         try {
            $this->conect = new PDO($dsn, $usuario, $contrasena, $dsn_Options);
            echo "Conexión exitosa a la base de datos";
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
    }

    public function convertir(){
        $stm = $this->conect->query('SELECT * FROM almacen');
        $resultado = $stm->fetchAll(PDO::FETCH_ASSOC);

        $json = json_encode($resultado);

        return $json;
    }
}

$cb = new conexion();

