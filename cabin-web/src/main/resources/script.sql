-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 25, 2016 at 11:13 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cabinas`
--

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `saldo` double DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id`, `correo`, `nombre`, `sexo`, `fecha_nacimiento`, `saldo`, `puntos`, `id_estado`, `id_nivel`, `id_usuario`) VALUES
(1, 'erick.gonzales@bbva.com', 'erick', 'M', '2000-01-05', 0, 0, 2, 2, 5),
(2, 'ivan@pucp.pe', 'ivan', 'M', '2000-01-01', 12, 10, 1, 1, 6),
(3, 'je@pucp.pe', 'Junior', 'M', '2000-01-01', 10, 100, 1, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `consola`
--

DROP TABLE IF EXISTS `consola`;

CREATE TABLE `consola` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `id_sede` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `consola`
--

INSERT INTO `consola` (`id`, `nombre`, `ip`, `id_estado`, `id_grupo`, `id_sede`) VALUES
(1, 'consola1', '192.168.1.1', 1, 1, 1),
(2, 'consola2', '192.168.1.2', 1, 1, 1),
(3, 'consola3', '192.168.1.3', 1, 2, 2),
(4, 'consola4', '192.168.1.4', 1, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;

CREATE TABLE `empleado` (
  `id` bigint(20) NOT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `tipo_documento` varchar(2) DEFAULT NULL,
  `n_documento` varchar(15) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`id`, `correo`, `nombre`, `telefono`, `tipo_documento`, `n_documento`, `sexo`, `fecha_nacimiento`, `id_estado`, `id_usuario`) VALUES
(1, 'user1@email.com', 'Erick', '954604372', '1', '71844756', 'M', '1993-05-04', 1, 1),
(2, 'user5@email.com', 'Erick', NULL, '1', '71844756', 'M', '1993-05-04', 2, 8),
(3, 'user6@email.com', 'Erick', NULL, '1', '71844756', 'M', '1993-05-04', 1, 9),
(4, 'j@pucp.pe', 'Junior', NULL, '1', '71844756', 'M', '2000-06-03', 1, 10),
(5, 'e@pucp.pe', 'e', NULL, NULL, '71844756', 'F', '2000-01-01', 1, 11);

-- --------------------------------------------------------

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;

CREATE TABLE `equipo` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `mac` varchar(50) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `id_sede` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipo`
--

INSERT INTO `equipo` (`id`, `nombre`, `ip`, `serie`, `mac`, `id_estado`, `id_grupo`, `id_sede`) VALUES
(1, 'pc1', '192.168.2.1', '100', '123456', 1, 1, 1),
(2, 'pc2', '192.168.2.2', '101', '789456', 1, 1, 1),
(3, 'pc3', '192.168.2.3', '123', '4567852', 1, 2, 2),
(4, 'pc4', '192.168.2.4', '125', '456147', 1, 2, 2),
(5, 'pc5', '192.168.2.5', '562', '156248', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;

CREATE TABLE `estado` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estado`
--

INSERT INTO `estado` (`id`, `nombre`) VALUES
(1, 'Activo'),
(2, 'Inactivo');

-- --------------------------------------------------------

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;

CREATE TABLE `grupo` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grupo`
--

INSERT INTO `grupo` (`id`, `nombre`, `descripcion`) VALUES
(1, 'VIP', 'Grupo VIP'),
(2, 'Normal', 'Grupo Normal');

-- --------------------------------------------------------

--
-- Table structure for table `incidencia`
--

DROP TABLE IF EXISTS `incidencia`;

CREATE TABLE `incidencia` (
  `id` bigint(20) NOT NULL,
  `trabajo_realizado` varchar(500) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id_empleado` bigint(20) DEFAULT NULL,
  `id_servicio` bigint(20) DEFAULT NULL,
  `id_sede` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `incidencia`
--

INSERT INTO `incidencia` (`id`, `trabajo_realizado`, `fecha`, `cantidad`, `id_empleado`, `id_servicio`, `id_sede`) VALUES
(1, 'Formateo de PCs', '2016-03-17', 10, 5, 1, 5),
(2, 'Formateo de PCs por virus', '2016-03-25', 99, 4, 1, 2),
(3, 'Cambio de ventilador del CPU', '2016-03-25', 99, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nivel`
--

DROP TABLE IF EXISTS `nivel`;

CREATE TABLE `nivel` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `puntos_inicial` int(11) DEFAULT NULL,
  `puntos_final` int(11) DEFAULT NULL,
  `pregunta` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nivel`
--

INSERT INTO `nivel` (`id`, `nombre`, `puntos_inicial`, `puntos_final`, `pregunta`) VALUES
(1, 'principiante', 0, 100, 'Pregunta principiante'),
(2, 'intermedio', 101, 500, 'pregunta intermedio'),
(3, 'senior', 501, 1000, 'pregunta senior'),
(4, 'pro gamer', 1001, 2000, 'pregunta pro gamer');

-- --------------------------------------------------------

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perfil`
--

INSERT INTO `perfil` (`id`, `nombre`, `descripcion`) VALUES
(1, 'operador', 'Operador de cabinas'),
(2, 'administrador', 'Administrador de cabinas'),
(3, 'usuarioFinal', 'Clientes finales de cabinas'),
(4, 'técnico', 'Perfil del técnico que registra incidentes');

-- --------------------------------------------------------

--
-- Table structure for table `regla_premio`
--

DROP TABLE IF EXISTS `regla_premio`;

CREATE TABLE `regla_premio` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `fraccion_saldo` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `regla_premio`
--

INSERT INTO `regla_premio` (`id`, `nombre`, `puntos`, `fraccion_saldo`) VALUES
(1, 'Oso', 10011, 2.5),
(2, 'laptop', 15201, 120),
(3, 'minutos', 2000, 203);

-- --------------------------------------------------------

--
-- Table structure for table `regla_puntuacion`
--

DROP TABLE IF EXISTS `regla_puntuacion`;

CREATE TABLE `regla_puntuacion` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `fraccion_recarga` double DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `regla_puntuacion`
--

INSERT INTO `regla_puntuacion` (`id`, `nombre`, `fraccion_recarga`, `puntos`, `id_estado`, `id_nivel`) VALUES
(1, 'regla1', 50, 100, 1, 1),
(2, 'regla2', 20, 50, 1, 3),
(3, 'regla3', 10, 20, 2, 2),
(4, 'regla 4', 100, 1000, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;

CREATE TABLE `sede` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sede`
--

INSERT INTO `sede` (`id`, `nombre`, `direccion`, `id_usuario`) VALUES
(1, 'sede UNI 10', 'av. tupac amaru 10', 1),
(2, 'sede prueba 2', 'direccion prueba 2 edit', 1),
(5, 'sede prueba 5', 'dirección prueba 5 edit', 1),
(6, 'Sede Fiori', 'jr Verona 425', 10);

-- --------------------------------------------------------

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;

CREATE TABLE `servicio` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `servicio`
--

INSERT INTO `servicio` (`id`, `nombre`, `descripcion`) VALUES
(1, 'pc', 'servicios de pc'),
(2, 'consola', 'servicios de consolas');

-- --------------------------------------------------------

--
-- Table structure for table `tarifa`
--

DROP TABLE IF EXISTS `tarifa`;

CREATE TABLE `tarifa` (
  `id` bigint(20) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tarifa`
--

-- --------------------------------------------------------

--
-- Table structure for table `tarifa`
--

DROP TABLE IF EXISTS `tarifa_detalle`;

CREATE TABLE `tarifa_detalle` (
  `id` bigint(20) NOT NULL,
  `dias` varchar(20) DEFAULT NULL,
  `fraccion_minima` double DEFAULT NULL,
  `hora_inicio` datetime DEFAULT NULL,
  `hora_fin` datetime DEFAULT NULL,
  `precio_hora` double DEFAULT NULL,
  `id_tarifa` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tarifa`
--

-- --------------------------------------------------------

--
-- Table structure for table `tarifa_por_grupo_sede`
--

DROP TABLE IF EXISTS `tarifa_por_grupo_sede`;

CREATE TABLE `tarifa_por_grupo_sede` (
  `id` bigint(20) NOT NULL,
  `id_sede` bigint(20) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `id_tarifa` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tarifa_por_grupo_sede`
--

-- --------------------------------------------------------

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;

CREATE TABLE `tipo_documento` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_documento`
--

INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES
(1, 'DNI'),
(2, 'C.E.'),
(3, 'PASAPORTE'),
(4, 'OTRO');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `clave` varchar(20) DEFAULT NULL,
  `id_perfil` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `clave`, `id_perfil`) VALUES
(1, 'user1@email.com', 'Ee12', 2),
(2, 'user2@email.com', 'inicio', 2),
(3, 'user3@email.com', 'inicio', 3),
(4, 'user4@email.com', 'inicio', 3),
(5, 'erick.gonzales@bbva.com', 'Ee12', 3),
(6, 'ivan@pucp.pe', 'Ee12', 3),
(7, 'je@pucp.pe', 'Ee12', 3),
(8, 'user5@email.com', 'Ee12', 1),
(9, 'user6@email.com', 'Ee12', 1),
(10, 'j@pucp.pe', 'Ee12', 1),
(11, 'e@pucp.pe', 'eE12', 4);

--
-- Table structure for table `estado_alquiler`
--

DROP TABLE IF EXISTS `estado_alquiler`;

CREATE TABLE `estado_alquiler` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `estado_alquiler` VALUES (1,'ALQUILADO'),(2,'DETENIDO');

--
-- Indexes for dumped tables
--

DROP TABLE IF EXISTS `alquiler`;

CREATE TABLE `alquiler` (
  `id` bigint(20) NOT NULL,
  `fecha_inicio`  datetime DEFAULT NULL,
  `fecha_modificacion`  datetime DEFAULT NULL,
  `tiempo_alquiler` double DEFAULT NULL,
  `id_estado_alquiler` bigint(20) DEFAULT NULL,
  `id_cliente` bigint(20) DEFAULT NULL,
  `id_equipo` bigint(20) DEFAULT NULL,
  `id_consola` bigint(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_nivel` (`id_nivel`),
  ADD KEY `cliente_ibfk_3` (`id_usuario`);

--
-- Indexes for table `consola`
--
ALTER TABLE `consola`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_sede` (`id_sede`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_sede` (`id_sede`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incidencia_ibfk_1` (`id_empleado`),
  ADD KEY `incidencia_ibfk_2` (`id_servicio`),
  ADD KEY `incidencia_ibfk_3` (`id_sede`);

--
-- Indexes for table `nivel`
--
ALTER TABLE `nivel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `regla_premio`
--
ALTER TABLE `regla_premio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `regla_puntuacion`
--
ALTER TABLE `regla_puntuacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado_idx` (`id_estado`),
  ADD KEY `id_nivel_idx` (`id_nivel`);

--
-- Indexes for table `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_idx` (`id_usuario`);

--
-- Indexes for table `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tarifa`
--
ALTER TABLE `tarifa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tarifa_detalle`
--
ALTER TABLE `tarifa_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tarifa` (`id_tarifa`);
  
--
-- Indexes for table `tarifa_por_grupo_sede`
--
ALTER TABLE `tarifa_por_grupo_sede`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sede` (`id_sede`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_tarifa` (`id_tarifa`);

--
-- Indexes for table `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_perfil` (`id_perfil`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `estado_alquiler`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alquiler`
--
ALTER TABLE `alquiler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado_alquiler` (`id_estado_alquiler`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_equipo` (`id_equipo`),
  ADD KEY `id_consola` (`id_consola`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `consola`
--
ALTER TABLE `consola`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `nivel`
--
ALTER TABLE `nivel`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `regla_premio`
--
ALTER TABLE `regla_premio`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `regla_puntuacion`
--
ALTER TABLE `regla_puntuacion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `sede`
--
ALTER TABLE `sede`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tarifa`
--
ALTER TABLE `tarifa`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tarifa`
--
ALTER TABLE `tarifa_detalle`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tarifa_por_grupo_sede`
--
ALTER TABLE `tarifa_por_grupo_sede`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `alquiler`
--
ALTER TABLE `estado_alquiler`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `alquiler`
--
ALTER TABLE `alquiler`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`),
  ADD CONSTRAINT `cliente_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `consola`
--
ALTER TABLE `consola`
  ADD CONSTRAINT `consola_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `consola_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  ADD CONSTRAINT `consola_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`);

--
-- Constraints for table `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  ADD CONSTRAINT `equipo_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`);

--
-- Constraints for table `incidencia`
--
ALTER TABLE `incidencia`
  ADD CONSTRAINT `incidencia_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id`),
  ADD CONSTRAINT `incidencia_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`),
  ADD CONSTRAINT `incidencia_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`);

--
-- Constraints for table `regla_puntuacion`
--
ALTER TABLE `regla_puntuacion`
  ADD CONSTRAINT `id_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tarifa_detalle`
--
ALTER TABLE `tarifa_detalle`
  ADD CONSTRAINT `tarifa_detalle_ibfk_1` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifa` (`id`);

  
--
-- Constraints for table `tarifa_por_grupo_sede`
--
ALTER TABLE `tarifa_por_grupo_sede`
  ADD CONSTRAINT `tarifa_por_grupo_sede_ibfk_1` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`),
  ADD CONSTRAINT `tarifa_por_grupo_sede_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  ADD CONSTRAINT `tarifa_por_grupo_sede_ibfk_3` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifa` (`id`);

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`);

--
-- Constraints for table `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `alquiler_ibfk_1` FOREIGN KEY (`id_estado_alquiler`) REFERENCES `estado_alquiler` (`id`),
  ADD CONSTRAINT `alquiler_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `alquiler_ibfk_3` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`),
  ADD CONSTRAINT `alquiler_ibfk_4` FOREIGN KEY (`id_consola`) REFERENCES `consola` (`id`);

--
-- Table structure for table `alquiler`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;