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
	-- Table structure for table `tipo_operario`
	--
	
	DROP TABLE IF EXISTS `tipo_operario`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `tipo_operario` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `nombre` varchar(20) DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `tipo_recarga`
	--
	
	LOCK TABLES `tipo_operario` WRITE;
	/*!40000 ALTER TABLE `tipo_operario` DISABLE KEYS */;
	INSERT INTO `tipo_operario` VALUES (1,'Automático'),(2,'Manual');
	/*!40000 ALTER TABLE `tipo_operario` ENABLE KEYS */;
	UNLOCK TABLES;
	
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
	  `apellido` varchar(100) DEFAULT NULL,
	  `sexo` varchar(1) DEFAULT NULL,
	  `fecha_nacimiento` date DEFAULT NULL,
	  `n_documento` varchar(15) DEFAULT NULL,
	  `saldo` double DEFAULT NULL,
	  `puntos` int(11) DEFAULT NULL,
	  `experiencia` int(11) DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,
	  `id_nivel` bigint(20) DEFAULT NULL,
	  `id_tipo_documento` bigint(20) DEFAULT NULL,
	  `id_usuario` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `id_estado` (`id_estado`),
	  KEY `id_nivel` (`id_nivel`),
	  KEY `id_usuario` (`id_usuario`),
	  KEY `id_tipo_documento` (`id_tipo_documento`),
	  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
	  CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`),
	  CONSTRAINT `cliente_ibfk_3` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id`),
	  CONSTRAINT `cliente_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `cliente`
	--
	
	LOCK TABLES `cliente` WRITE;
	/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
	INSERT INTO `cliente` VALUES (1,'erick.gonzales@bbva.com','erick','Gonzales','M','2000-01-05',12345678,0,2,9,1,2,1,5),(2,'ivan@pucp.pe','ivan','Gonzales','M','2000-01-01',12345678,12,10,10,1,1,1,6),(3,'je@pucp.pe','Junior','Gonzales','M','2000-01-01',12345678,10,100,50,1,1,1,7),(4,'userlab01@cabinas.com','userlab01','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,12),(5,'userlab02@cabinas.com','userlab02','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,13),(6,'userlab03@cabinas.com','userlab03','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,14),(7,'userlab04@cabinas.com','userlab04','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,15),(8,'userlab05@cabinas.com','userlab05','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,16),(9,'userlab06@cabinas.com','userlab06','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,17),(10,'userlab07@cabinas.com','userlab07','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,18),(11,'userlab08@cabinas.com','userlab08','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,19),(12,'userlab09@cabinas.com','userlab09','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,20),(13,'userlab10@cabinas.com','userlab10','Gonzales','M','2000-01-01',12345678,0,0,0,2,1,1,21);
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
	  `apellido` varchar(100) DEFAULT NULL,
	  `telefono` varchar(15) DEFAULT NULL,  
	  `n_documento` varchar(15) DEFAULT NULL,
	  `sexo` varchar(1) DEFAULT NULL,
	  `fecha_nacimiento` date DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,
	  `id_tipo_documento` bigint(20) DEFAULT NULL,
	  `id_usuario` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `id_estado` (`id_estado`),
	  KEY `id_usuario` (`id_usuario`),
	  KEY `id_tipo_documento` (`id_tipo_documento`),
	  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
	  CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id`),
	  CONSTRAINT `empleado_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `empleado`
	--
	
	LOCK TABLES `empleado` WRITE;
	/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
	INSERT INTO `empleado` VALUES (1,'user1@email.com','Erick','Gonzales','954604372','71844756','M','1993-05-04',1,1,1),(2,'user5@email.com','Erick','Gonzales',NULL,'71844756','M','1993-05-04',2,1,8),(3,'user6@email.com','Erick','Gonzales',NULL,'71844756','M','1993-05-04',1,1,9),(4,'j@pucp.pe','Junior','Gonzales',NULL,'71844756','M','2000-06-03',1,1,10),(5,'e@pucp.pe','e','Gonzales',NULL,'71844756','F','2000-01-01',1,1,11);
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
	) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `estado`
	--
	
	LOCK TABLES `estado` WRITE;
	/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
	INSERT INTO `estado` VALUES (1,'Activo'),(2,'Inactivo'), (3, 'Válido'), (4, 'Anulado');
	/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
	UNLOCK TABLES;
	
	--
	-- Table structure for table `estado`
	--
	
	DROP TABLE IF EXISTS `falla`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `falla` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `nombre` varchar(20) DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `falla`
	--
	
	LOCK TABLES `falla` WRITE;
	/*!40000 ALTER TABLE `falla` DISABLE KEYS */;
	INSERT INTO `falla` VALUES (1,'Red'),(2,'Equipo averiado'), (3, 'Audio');
	/*!40000 ALTER TABLE `falla` ENABLE KEYS */;
	UNLOCK TABLES;
	
	--
	-- Table structure for table `experiencia`
	--
	
	DROP TABLE IF EXISTS `falla_por_equipo`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `falla_por_equipo` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `id_equipo` bigint(20) DEFAULT NULL,
	  `id_falla` bigint(20) DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `falla_por_equipo_equipo_idx` (`id_equipo`),
	  KEY `falla_por_equipo_falla_idx` (`id_falla`),
	  KEY `falla_por_equipo_estado_idx` (`id_estado`),
	  CONSTRAINT `falla_por_equipo_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `falla_por_equipo_falla` FOREIGN KEY (`id_falla`) REFERENCES `falla` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `falla_por_equipo_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Table structure for table `tipo_recarga`
	--
	
	DROP TABLE IF EXISTS `tipo_recarga`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `tipo_recarga` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `nombre` varchar(20) DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `tipo_recarga`
	--
	
	LOCK TABLES `tipo_recarga` WRITE;
	/*!40000 ALTER TABLE `tipo_recarga` DISABLE KEYS */;
	INSERT INTO `tipo_recarga` VALUES (1,'Automático'),(2,'Manual');
	/*!40000 ALTER TABLE `tipo_recarga` ENABLE KEYS */;
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
	-- Table structure for table `estado_alquiler`
	--
	
	DROP TABLE IF EXISTS `tipo_gasto`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `tipo_gasto` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `nombre` varchar(50) DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `estado_alquiler`
	--
	
	LOCK TABLES `tipo_gasto` WRITE;
	/*!40000 ALTER TABLE `tipo_gasto` DISABLE KEYS */;
	INSERT INTO `tipo_gasto` VALUES (1,'ALIMENTACION'),(2,'DEVOLUCION USUARIO ANONIMO'),(3,'DEVOLUCION USUARIO REGISTRADO');
	/*!40000 ALTER TABLE `tipo_gasto` ENABLE KEYS */;
	UNLOCK TABLES;
	
	
	--
	-- Table structure for table `ticket`
	--
	
	DROP TABLE IF EXISTS `ticket`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `ticket` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,  
	  `monto` double DEFAULT NULL,
	  `fecha` datetime DEFAULT NULL,
	  `id_empleado` bigint(20) DEFAULT NULL,
	  `id_cliente` bigint(20) DEFAULT NULL,
	  `id_tipo_recarga` bigint(20) DEFAULT NULL,
	  `id_tipo_gasto` bigint(20) DEFAULT NULL,
	  `id_caja` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `ticket_cliente_idx` (`id_cliente`),
	  KEY `ticket_empleado_idx` (`id_empleado`),
	  KEY `ticket_tipo_recarga_idx` (`id_tipo_recarga`),
	  KEY `ticket_caja_idx` (`id_caja`),
	  KEY `ticket_tipo_gasto_idx` (`id_tipo_gasto`),
	  CONSTRAINT `ticket_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `ticket_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `ticket_tipo_recarga` FOREIGN KEY (`id_tipo_recarga`) REFERENCES `tipo_recarga` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `ticket_caja` FOREIGN KEY (`id_caja`) REFERENCES `caja` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `ticket_tipo_gasto` FOREIGN KEY (`id_tipo_gasto`) REFERENCES `tipo_gasto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `ticket`
	--
	
	
	--
	-- Table structure for table `cierre_caja`
	--
	
	DROP TABLE IF EXISTS `caja`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `caja` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `fecha_apertura` datetime DEFAULT NULL,
	  `fecha_modificacion` datetime DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,
	  `id_empleado` bigint(20) DEFAULT NULL,
	  `id_sede` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `caja_estado_idx` (`id_estado`),
	  KEY `caja_empleado_idx` (`id_empleado`),
	  KEY `caja_sede_idx` (`id_sede`),
	  CONSTRAINT `caja_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `caja_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `caja_sede` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `cierre_caja`
	--
	
	
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
	  `id_estado` bigint(20) DEFAULT NULL,    
	  PRIMARY KEY (`id`),
	  KEY `id_estado_idx` (`id_estado`),
	  CONSTRAINT `id_nivel_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `nivel`
	--
	
	LOCK TABLES `nivel` WRITE;
	/*!40000 ALTER TABLE `nivel` DISABLE KEYS */;
	INSERT INTO `nivel` VALUES (1,'principiante',0,100,'Pregunta principiante',1),(2,'intermedio',101,500,'pregunta intermedio',1),(3,'senior',501,1000,'pregunta senior',1),(4,'pro gamer',1001,2000,'pregunta pro gamer',1);
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
	  `id_estado` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `id_nivel_idx` (`id_nivel`),
	  KEY `id_estado_idx` (`id_estado`),
	  CONSTRAINT `id_regla_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `id_regla_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `regla_premio`
	--
	
	LOCK TABLES `regla_premio` WRITE;
	/*!40000 ALTER TABLE `regla_premio` DISABLE KEYS */;
	INSERT INTO `regla_premio` VALUES (1,'Oso',10011,2.5,1,1),(2,'laptop',15201,120,2,1),(3,'minutos',2000,203,3,1);
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
	  `cantidad_maxima_operador` int(2) DEFAULT NULL,
	  `id_tipo_operario` bigint(20) DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,	  	  
	  PRIMARY KEY (`id`),
	  KEY `id_tipo_operario_idx` (`id_tipo_operario`),
	  KEY `id_estado_idx` (`id_estado`),
	  CONSTRAINT `id_tipo_operario` FOREIGN KEY (`id_tipo_operario`) REFERENCES `tipo_operario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `id_sede_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `sede`
	--
	
	LOCK TABLES `sede` WRITE;
	/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
	INSERT INTO `sede` VALUES (1,'sede UNI 10','av. tupac amaru 10',10,1,1),(2,'sede prueba 2','direccion prueba 2 edit',10,1,1),(5,'sede prueba 5','dirección prueba 5 edit',10,1,1),(6,'Sede Fiori','jr Verona 425',10,1,1);
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
	  `id_estado` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `id_estado_idx` (`id_estado`),
	  CONSTRAINT `id_tarifa_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
	  `dias` varchar(50) DEFAULT NULL,
	  `hora_inicio` varchar(5) DEFAULT NULL,
	  `hora_fin` varchar(5) DEFAULT NULL,
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
	INSERT INTO `tarifa_detalle` VALUES (1,'Lun-Mar-Mie-Jue-Vie','15:00','19:00',2,1);
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
	-- Table structure for table `parametro`
	--
	
	DROP TABLE IF EXISTS `parametro`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `parametro` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `nombre` varchar(50) DEFAULT NULL,
	  `valor` varchar(20) DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `parametro_estado_idx` (`id_estado`),  
	  CONSTRAINT `parametro_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `parametro`
	--
	
	LOCK TABLES `parametro` WRITE;
	/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
	INSERT INTO `parametro` VALUES (1,'Fracción de recarga', 0.5,1),(2,'Fracción mínima.', 0.5,1),(3,'Fracción manima.', 5,1),(4,'Numero maximo de fallas.', '3',1),(5,'Aletas fin de Saldo (Minutos).', '10,5,3',1),(6,'Objetivo del Mes', '1000',1);
	/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;
	UNLOCK TABLES;
	
	
	--
	-- Table structure for table `bonificacion`
	--
	
	DROP TABLE IF EXISTS `bonificacion`;
	/*!40101 SET @saved_cs_client     = @@character_set_client */;
	/*!40101 SET character_set_client = utf8 */;
	CREATE TABLE `bonificacion` (
	  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `nombre` varchar(20) DEFAULT NULL,
	  `cantidad_experiencia` int(11) DEFAULT NULL,
	  `fraccion_otorgar` double DEFAULT NULL,
	  `id_estado` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `bonificacion_estado_idx` (`id_estado`),  
	  CONSTRAINT `bonificacion_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	
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
	  `anonimo` varchar(1),
	  `id_estado` bigint(20) DEFAULT NULL,
	  `id_sede` bigint(20) DEFAULT NULL,
	  PRIMARY KEY (`id`),
	  KEY `usuario_perfil_idx` (`id_perfil`),
	  KEY `usuario_estado_idx` (`id_estado`),
	  KEY `usuario_sede_idx` (`id_sede`),
	  CONSTRAINT `usuario_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`),
	  CONSTRAINT `usuario_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
	  CONSTRAINT `usuario_sede` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
	/*!40101 SET character_set_client = @saved_cs_client */;
	
	--
	-- Dumping data for table `usuario`
	--
	
	LOCK TABLES `usuario` WRITE;
	/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
	INSERT INTO `usuario` VALUES (1,'user1@email.com','Ee12',1,'0',2,null),(2,'user2@email.com','inicio',2,'0',2,null),(3,'user3@email.com','inicio',3,'0',2,null),(4,'user4@email.com','inicio',3,'0',2,null),(5,'erick.gonzales@bbva.com','Ee12',3,'0',2,null),(6,'ivan@pucp.pe','Ee12',3,'0',2,null),(7,'je@pucp.pe','Ee12',3,'0',2,null),(8,'user5@email.com','Ee12',1,'0',2,null),(9,'user6@email.com','Ee12',2,'0',2,null),(10,'j@pucp.pe','Ee12',1,'0',2,null),(11,'e@pucp.pe','eE12',4,'0',2,null),(12,'userlab01@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(13,'userlab02@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(14,'userlab03@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(15,'userlab04@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(16,'userlab05@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(17,'userlab06@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(18,'userlab07@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(19,'userlab08@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(20,'userlab09@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null),(21,'userlab10@cabinas.com','067e6162-3b6f-4ae2-a171-2470b63dff00',3,'1',2,null);
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
