-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: cabinas
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alquiler`
--

DROP TABLE IF EXISTS `alquiler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alquiler` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `tiempo_alquiler` varchar(50) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `id_estado_alquiler` bigint(20) DEFAULT NULL,
  `id_cliente` bigint(20) DEFAULT NULL,
  `id_equipo` bigint(20) DEFAULT NULL,
  `id_consola` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estado_alquiler` (`id_estado_alquiler`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_equipo` (`id_equipo`),
  KEY `id_consola` (`id_consola`),
  CONSTRAINT `alquiler_ibfk_1` FOREIGN KEY (`id_estado_alquiler`) REFERENCES `estado_alquiler` (`id`),
  CONSTRAINT `alquiler_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `alquiler_ibfk_3` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`),
  CONSTRAINT `alquiler_ibfk_4` FOREIGN KEY (`id_consola`) REFERENCES `consola` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alquiler`
--

LOCK TABLES `alquiler` WRITE;
/*!40000 ALTER TABLE `alquiler` DISABLE KEYS */;
/*!40000 ALTER TABLE `alquiler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `correo` varchar(80) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `saldo` double DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `experiencia` int(11) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estado` (`id_estado`),
  KEY `id_nivel` (`id_nivel`),
  KEY `cliente_ibfk_3` (`id_usuario`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`),
  CONSTRAINT `cliente_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'erick.gonzales@bbva.com','erick','M','2000-01-05',0,2,9,2,2,5),(2,'ivan@pucp.pe','ivan','M','2000-01-01',12,10,10,1,1,6),(3,'je@pucp.pe','Junior','M','2000-01-01',10,100,50,1,1,7);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consola`
--

DROP TABLE IF EXISTS `consola`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consola` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `id_sede` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estado` (`id_estado`),
  KEY `id_grupo` (`id_grupo`),
  KEY `id_sede` (`id_sede`),
  CONSTRAINT `consola_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  CONSTRAINT `consola_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  CONSTRAINT `consola_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consola`
--

LOCK TABLES `consola` WRITE;
/*!40000 ALTER TABLE `consola` DISABLE KEYS */;
INSERT INTO `consola` VALUES (1,'consola1','192.168.1.1',1,1,1),(2,'consola2','192.168.1.2',1,1,1),(3,'consola3','192.168.1.3',1,2,2),(4,'consola4','192.168.1.4',1,2,2);
/*!40000 ALTER TABLE `consola` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empleado` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `correo` varchar(80) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `tipo_documento` varchar(2) DEFAULT NULL,
  `n_documento` varchar(15) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estado` (`id_estado`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'user1@email.com','Erick','954604372','1','71844756','M','1993-05-04',1,1),(2,'user5@email.com','Erick',NULL,'1','71844756','M','1993-05-04',2,8),(3,'user6@email.com','Erick',NULL,'1','71844756','M','1993-05-04',1,9),(4,'j@pucp.pe','Junior',NULL,'1','71844756','M','2000-06-03',1,10),(5,'e@pucp.pe','e',NULL,NULL,'71844756','F','2000-01-01',1,11);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `mac` varchar(50) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `id_sede` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estado` (`id_estado`),
  KEY `id_grupo` (`id_grupo`),
  KEY `id_sede` (`id_sede`),
  CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  CONSTRAINT `equipo_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES (1,'pc1','192.168.2.1','100','123456',1,1,1),(2,'pc2','192.168.2.2','101','789456',1,1,1),(3,'pc3','192.168.2.3','123','4567852',1,2,2),(4,'pc4','192.168.2.4','125','456147',1,2,2),(5,'pc5','192.168.2.5','562','156248',2,1,1);
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Activo'),(2,'Inactivo');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_alquiler`
--

DROP TABLE IF EXISTS `estado_alquiler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_alquiler` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_alquiler`
--

LOCK TABLES `estado_alquiler` WRITE;
/*!40000 ALTER TABLE `estado_alquiler` DISABLE KEYS */;
INSERT INTO `estado_alquiler` VALUES (1,'ALQUILADO'),(2,'DETENIDO');
/*!40000 ALTER TABLE `estado_alquiler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencia`
--

DROP TABLE IF EXISTS `experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiencia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `fraccion_recarga` double DEFAULT NULL,
  `experiencia_otorgar` int(11) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `experiencia_estado_idx` (`id_estado`),
  KEY `experiencia_nivel_idx` (`id_nivel`),
  CONSTRAINT `experiencia_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `experiencia_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia`
--

LOCK TABLES `experiencia` WRITE;
/*!40000 ALTER TABLE `experiencia` DISABLE KEYS */;
INSERT INTO `experiencia` VALUES (1,'experiencia 1',10,5,1,1),(2,'experiencia 2',20,9,1,2),(3,'experiencia 3',30,13,1,3);
/*!40000 ALTER TABLE `experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` VALUES (1,'Normal','Grupo Normal'),(2,'VIP','Grupo VIP'),(3,'Mantenimiento','Grupo Mantenimiento');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidencia`
--

DROP TABLE IF EXISTS `incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incidencia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `trabajo_realizado` varchar(500) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id_empleado` bigint(20) DEFAULT NULL,
  `id_servicio` bigint(20) DEFAULT NULL,
  `id_sede` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incidencia_ibfk_1` (`id_empleado`),
  KEY `incidencia_ibfk_2` (`id_servicio`),
  KEY `incidencia_ibfk_3` (`id_sede`),
  CONSTRAINT `incidencia_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id`),
  CONSTRAINT `incidencia_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`),
  CONSTRAINT `incidencia_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidencia`
--

LOCK TABLES `incidencia` WRITE;
/*!40000 ALTER TABLE `incidencia` DISABLE KEYS */;
INSERT INTO `incidencia` VALUES (1,'Formateo de PCs','2016-03-17',10,5,1,5),(2,'Formateo de PCs por virus','2016-03-25',99,4,1,2),(3,'Cambio de ventilador del CPU','2016-03-25',99,NULL,1,1);
/*!40000 ALTER TABLE `incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivel`
--

DROP TABLE IF EXISTS `nivel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nivel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `experiencia_inicial` int(11) DEFAULT NULL,
  `experiencia_final` int(11) DEFAULT NULL,
  `pregunta` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivel`
--

LOCK TABLES `nivel` WRITE;
/*!40000 ALTER TABLE `nivel` DISABLE KEYS */;
INSERT INTO `nivel` VALUES (1,'principiante',0,100,'Pregunta principiante'),(2,'intermedio',101,500,'pregunta intermedio'),(3,'senior',501,1000,'pregunta senior'),(4,'pro gamer',1001,2000,'pregunta pro gamer');
/*!40000 ALTER TABLE `nivel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'operador','Operador de cabinas'),(2,'administrador','Administrador de cabinas'),(3,'usuarioFinal','Clientes finales de cabinas'),(4,'técnico','Perfil del técnico que registra incidentes');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regla_premio`
--

DROP TABLE IF EXISTS `regla_premio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regla_premio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `fraccion_saldo` double DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_nivel_idx` (`id_nivel`),
  CONSTRAINT `id_regla_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regla_premio`
--

LOCK TABLES `regla_premio` WRITE;
/*!40000 ALTER TABLE `regla_premio` DISABLE KEYS */;
INSERT INTO `regla_premio` VALUES (1,'Oso',10011,2.5,1),(2,'laptop',15201,120,2),(3,'minutos',2000,203,3);
/*!40000 ALTER TABLE `regla_premio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regla_puntuacion`
--

DROP TABLE IF EXISTS `regla_puntuacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regla_puntuacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `fraccion_recarga` double DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `id_estado` bigint(20) DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estado_idx` (`id_estado`),
  KEY `id_nivel_idx` (`id_nivel`),
  CONSTRAINT `id_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regla_puntuacion`
--

LOCK TABLES `regla_puntuacion` WRITE;
/*!40000 ALTER TABLE `regla_puntuacion` DISABLE KEYS */;
INSERT INTO `regla_puntuacion` VALUES (1,'regla1',50,100,1,1),(2,'regla2',20,50,1,3),(3,'regla3',10,20,2,2),(4,'regla 4',100,1000,1,3);
/*!40000 ALTER TABLE `regla_puntuacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sede` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'sede UNI 10','av. tupac amaru 10',1),(2,'sede prueba 2','direccion prueba 2 edit',1),(5,'sede prueba 5','dirección prueba 5 edit',1),(6,'Sede Fiori','jr Verona 425',10);
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (1,'pc','servicios de pc'),(2,'consola','servicios de consolas');
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarifa`
--

DROP TABLE IF EXISTS `tarifa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarifa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `fraccion_minima` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarifa`
--

LOCK TABLES `tarifa` WRITE;
/*!40000 ALTER TABLE `tarifa` DISABLE KEYS */;
INSERT INTO `tarifa` VALUES (1,'tarifa defecto',2,1);
/*!40000 ALTER TABLE `tarifa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarifa_detalle`
--

DROP TABLE IF EXISTS `tarifa_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarifa_detalle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dias` varchar(20) DEFAULT NULL,
  `fraccion_minima` double DEFAULT NULL,
  `hora_inicio` datetime DEFAULT NULL,
  `hora_fin` datetime DEFAULT NULL,
  `precio_hora` double DEFAULT NULL,
  `id_tarifa` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tarifa` (`id_tarifa`),
  CONSTRAINT `tarifa_detalle_ibfk_1` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarifa_detalle`
--

LOCK TABLES `tarifa_detalle` WRITE;
/*!40000 ALTER TABLE `tarifa_detalle` DISABLE KEYS */;
INSERT INTO `tarifa_detalle` VALUES (1,'Lun-Mar-Mie-Jue-Vie',1,'2016-07-18 19:01:01','2016-07-19 15:00:01',2,1);
/*!40000 ALTER TABLE `tarifa_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarifa_por_grupo_sede`
--

DROP TABLE IF EXISTS `tarifa_por_grupo_sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarifa_por_grupo_sede` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_sede` bigint(20) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `id_tarifa` bigint(20) DEFAULT NULL,
  `pc_consola` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sede` (`id_sede`),
  KEY `id_grupo` (`id_grupo`),
  KEY `id_tarifa` (`id_tarifa`),
  CONSTRAINT `tarifa_por_grupo_sede_ibfk_1` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`),
  CONSTRAINT `tarifa_por_grupo_sede_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  CONSTRAINT `tarifa_por_grupo_sede_ibfk_3` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarifa_por_grupo_sede`
--

LOCK TABLES `tarifa_por_grupo_sede` WRITE;
/*!40000 ALTER TABLE `tarifa_por_grupo_sede` DISABLE KEYS */;
INSERT INTO `tarifa_por_grupo_sede` VALUES (1,1,1,1,'P'),(2,1,2,1,'P'),(3,1,3,1,'P'),(4,1,1,1,'C'),(5,1,2,1,'C'),(6,1,3,1,'C');
/*!40000 ALTER TABLE `tarifa_por_grupo_sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_documento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'DNI'),(2,'C.E.'),(3,'PASAPORTE'),(4,'OTRO');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `clave` varchar(20) DEFAULT NULL,
  `id_perfil` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_perfil` (`id_perfil`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'user1@email.com','Ee12',2),(2,'user2@email.com','inicio',2),(3,'user3@email.com','inicio',3),(4,'user4@email.com','inicio',3),(5,'erick.gonzales@bbva.com','Ee12',3),(6,'ivan@pucp.pe','Ee12',3),(7,'je@pucp.pe','Ee12',3),(8,'user5@email.com','Ee12',1),(9,'user6@email.com','Ee12',1),(10,'j@pucp.pe','Ee12',1),(11,'e@pucp.pe','eE12',4);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-19 20:34:58
