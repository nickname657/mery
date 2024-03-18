<?php

class conexion
{
    public $conect;
    public function __construct() {
         $dsn = "mysql:host=localhost;dbname=almacen";
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

}

$cb = new conexion();

