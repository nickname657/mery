-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2024 a las 19:56:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `almacen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `idFamilia` int(11) DEFAULT NULL,
  `descripcion` varchar(120) DEFAULT NULL,
  `precioCoste` decimal(10,0) DEFAULT NULL,
  `precioVenta` decimal(10,0) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `stockMin` int(11) DEFAULT NULL,
  `codigoProv` varchar(50) DEFAULT NULL,
  `unidadesVendidas` int(11) DEFAULT NULL,
  `foto` longblob DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `idFamilia`, `descripcion`, `precioCoste`, `precioVenta`, `stock`, `stockMin`, `codigoProv`, `unidadesVendidas`, `foto`, `fecha`) VALUES
(1, 1, 'Teléfono móvil', 300, 450, 50, 10, 'PROD001', 20, NULL, '2024-03-18'),
(2, 1, 'Tablet', 200, 300, 30, 5, 'PROD002', 15, NULL, '2024-03-18'),
(3, 2, 'Camiseta', 20, 35, 100, 20, 'PROD003', 50, NULL, '2024-03-18'),
(4, 2, 'Pantalón', 40, 60, 80, 15, 'PROD004', 30, NULL, '2024-03-18'),
(5, 3, 'Muñeca', 15, 25, 50, 10, 'PROD005', 20, NULL, '2024-03-18'),
(6, 3, 'Carro de juguete', 10, 20, 70, 15, 'PROD006', 40, NULL, '2024-03-18'),
(7, 4, 'Arroz', 10, 15, 200, 50, 'PROD007', 100, NULL, '2024-03-18'),
(8, 4, 'Pasta', 8, 12, 150, 30, 'PROD008', 80, NULL, '2024-03-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familias`
--

CREATE TABLE `familias` (
  `id` int(11) NOT NULL,
  `nombreFamilia` varchar(11) DEFAULT NULL,
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `familias`
--

INSERT INTO `familias` (`id`, `nombreFamilia`, `foto`) VALUES
(1, 'Electrónica', NULL),
(2, 'Ropa', NULL),
(3, 'Juguetes', NULL),
(4, 'Alimentos', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFamilia` (`idFamilia`);

--
-- Indices de la tabla `familias`
--
ALTER TABLE `familias`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `familias`
--
ALTER TABLE `familias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `articulos_ibfk_1` FOREIGN KEY (`idFamilia`) REFERENCES `familias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
