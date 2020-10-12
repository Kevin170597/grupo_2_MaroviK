-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: marovik2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_idx` (`id_user`),
  KEY `id_product_idx` (`id_product`),
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `namePath` varchar(45) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tecnologìa','tecnologia','img-banner-categoria-tecnologia.jpg'),(2,'Electrodomésticos','electrodomesticos','img-banner-categoria-electrodomesticos.jpeg'),(3,'Bebés y Niños','bebes-y-ninos','img-banner-categoria-bebes-y-ninos.jpg'),(4,'Librería','libreria','img-banner-categoria-libreria.jpg'),(5,'Almacen','almacen','img-banner-categoria-almacen.jpg'),(6,'Bebidas','bebidas','img-banner-categoria-bebidas.jpg'),(7,'Frutas y Verduras','frutas-y-verduras','img-banner-categoria-frutas-y-verduras.jpg'),(8,'Carnes','carnes','img-banner-categoria-carnes.jpg'),(9,'Pescados y Mariscos','pescados-y-mariscos','img-banner-categoria-pescados-y-mariscos.jpg'),(10,'Quesos y Fiambres','quesos-y-fiambres','img-banner-categoria-pescados-y-mariscos.jpg'),(11,'Lacteos','lacteos','img-banner-categoria-pescados-y-mariscos.jpg'),(12,'Congelados','congelados','img-banner-categoria-pescados-y-mariscos.jpg'),(13,'Perfumería','perfumeria','img-banner-categoria-pescados-y-mariscos.jpg'),(14,'Limpieza','limpieza','img-banner-categoria-pescados-y-mariscos.jpg'),(15,'Mascotas','mascotas','img-banner-categoria-pescados-y-mariscos.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mark` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT 0,
  `stock` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_subcategory` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_idx` (`id_user`),
  KEY `id_subcategorie_idx` (`id_subcategory`),
  CONSTRAINT `id_subcategorie` FOREIGN KEY (`id_subcategory`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Celular Libre Samsung Galaxy Note20 Ultra 5G','Samsung',129000,15,5,'smart samsung','img-samsung-galaxy-note20-ultra-5g.jpg',NULL,NULL,NULL,2),(5,'Celular Libre Samsung Galaxy A80','Samsung',56000,5,5,'El Smartphone Samsung','img-samsung-galaxy-a80.jpg',NULL,NULL,NULL,2),(6,'Celular Libre Samsung Galaxy A70','Samsung',54000,0,5,'El Smartphone Samsung','img-samsung-galaxy-a70.jpg',NULL,NULL,NULL,2),(7,'Notebook Asus Chromebook 14\" HD Intel Celeron N3350 4GB RAM ','Asus',250000,0,5,'Notebook Asus','img-notebook-asus-chromebook-Z1400CN-BV0306.jpg',NULL,NULL,NULL,1),(8,'Palta por Unidad','',76,0,90,'Palta por Unidad','image1602343884168.jpg','2020-10-10 15:31:24','2020-10-10 15:31:24',NULL,41),(9,'Uva Negra por Kg','',178,0,789,'Uva Negra por Kg','image1602350519312.jpg','2020-10-10 17:21:59','2020-10-10 17:21:59',NULL,39),(10,'Toallas humedas','Johnson',150,0,0,'Toallas humedas sin perfumes, hipoalergenica.','image1602399647609.jpg','2020-10-11 07:00:47','2020-10-11 07:00:47',3,13),(11,'Shampu jhonson','Johnson',200,0,0,'Shampu de manzanilla, mantiene el ph equilibrado del cuero cabelludo del bebe, no irrita la piel.','image1602399923926.jpg','2020-10-11 07:05:23','2020-10-11 07:05:23',3,13),(12,'Pañales','Babysec',250,0,0,'Pañales hipoalergenicos, sin perfume y de maxima absorcion.','image1602400068836.jpg','2020-10-11 07:07:48','2020-10-11 07:07:48',3,14);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `name_path` varchar(45) NOT NULL,
  `image` varchar(100) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categorie_idx` (`id_category`),
  CONSTRAINT `categorie_id` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Notebooks y PC','notebooks-y-pc','img-categoria-tecnologia-notebooks-y-pc.jpg',1),(2,'Celulares y Tablets','celulares-y-tablets','img-categoria-tecnologia-celulares-y-tablets.jpg',1),(3,'Smart TV  Audio y Video','smart-tv-audio-y-video','img-categoria-tecnologia-smart-tv-audio-y-video.jpg',1),(4,'Gaming','gaming','img-categoria-tecnologia-gaming.jpg',1),(5,'Lavado','lavado','img-categoria-electrodomestico-lavado.jpg',2),(6,'Heladeras Freezers y Canvas','heladeras-freezers-y-canvas','img-categoria-electromesticos-heladeras-freezer-y-canvas.jpg',2),(7,'Cocinas y Hornos','cocinas-y-hornos','img-categoria-electrodomesticos-cocinas-y-hornos.jpg',2),(8,'Climatización','climatizacion','img-categoria-electrodomesticos-climatizacion.jpg',2),(9,'Termotanques y Calefones','termotanques-y-calefones','img-categoria-electrodomesticos-termotanques-y-calefones.jpg',2),(10,'Pequeños de hogar','pequeños-de-hogar','img-categoria-electrodomesticos-pequenos-de-hogar.jpg',2),(11,'Pequeños de Cocina','pequeños-de-cocina','img-categoria-electrodomesticos-pequenos-de-cocina.jpg',2),(12,'Alimentación','alimentacion','img-categoria-bebes-y-ninos-alimentacion.jpg',3),(13,'Cuidado del Bebé','cuidados-del-bebe','img-categoria-bebes-y-ninos-cuidado-del-bebe.jpg',3),(14,'Pañales','panales','img-categoria-bebes-y-ninos-panales.jpg',3),(15,'Mamaderas Chupetes Y Baberos','mamaderas-chupetes-y-baberos','img-categoria-bebes-y-ninos-mamaderas-chupetes-y-baberos.jpg',3),(16,'Carpetas','carpetas','img-categoria-libreria-carpetas.jpg',4),(17,'Escrituras','escrituras','img-categoria-libreria-escritura.jpg',4),(18,'Cuadernos y Repuestos','cuadernos-y-repuestos','img-categoria-libreria-cuadernos-y-repuestos.jpg',4),(19,'Mochilas y Cartucheras','mochilas-y-cartucheras','img-categoria-libreria-mochilas-y-cartucheras.jpg',4),(20,'Aceites y Vinagres','aceites-y-vinagres','img-categoria-almacen-aceites-y-vinagres.jpg',5),(21,'Aderezos','aderezos','img-categoria-almacen-aderezos.jpg',5),(22,'Arroz y Legumbres','arroz-y-legumbres','img-categoria-almacen-arroz-y-legumbres.jpg',5),(23,'Conservas','conservas','img-categoria-almacen-conservas.jpg',5),(24,'Desayuno y Merienda','desayuno-y-merienda','img-categoria-almacen-desayuno-y-merienda.jpg',5),(25,'Golosinas y Chocolates','golosinas-y-chocolates','img-categoria-almacen-chocolates-y-golosinas.jpg',5),(26,'Harinas','harinas','img-categoria-almacen-harinas.jpg',5),(27,'Pastas Secas y Salsas','pastas-secas-y-salsas','img-categoria-almacen-pastas-secas-y-salsas.jpg',5),(28,'Sal y Condimentos','sal-y-condimentos','img-categoria-almacen-sal-y-condimentos.jpg',5),(29,'Aguas','aguas','img-categoria-bebidas-aguas.jpg',6),(30,'Aperitivos','aperitivos','img-categoria-bebidas-aguas.jpg',6),(31,'Bebidas Blancas','bebidas-blancas','img-categoria-bebidas-bebidas-blancas.jpg',6),(32,'Champagnes','champagnes','img-categoria-bebidas-champagnes.jpg',6),(33,'Cervezas','cerveza','img-categoria-bebidas-cervezas.jpg',6),(34,'Energizantes','energizantes','img-categoria-bebidas-cervezas.jpg',6),(35,'Gaseosas','gaseosas','img-categoria-bebidas-gaseosas.jpg',6),(36,'Jugos','jugos','img-categoria-bebidas-jugos.jpg',6),(37,'Licores','licores','img-categoria-bebidas-licores.jpg',6),(38,'Vinos','vinos','img-categoria-bebidas-vinos.jpg',6),(39,'Frutas','frutas','img-categoria-frutas-y-verduras-frutas.jpg',7),(40,'Legumbres Granos y Semillas','legumbres-granos-y-semillas','img-categoria-frutas-y-verduras-legumbres-granos-y-semillas.jpg',7),(41,'Verduras','verduras','img-categoria-frutas-y-verduras-verduras.jpg',7),(42,'Carne Vacuna','carne-vacuna','img-categoria-carnes-carne-vacuna.jpg',8),(43,'Carne de Cerdo','carne-de-cerdo','img-categoria-carnes-carne-de-cerdo.jpg',8),(44,'Embutidos','embutidos','img-categoria-carnes-embutidos.jpg',8),(45,'Pollos','pollos','img-categoria-carnes-pollos.jpg',8),(46,'Mariscos','mariscos','img-categoria-pescados-y-mariscos-mariscos.jpg',9),(47,'Pescados','pescados','img-categoria-pescados-y-mariscos-pescados.jpg',9),(48,'Quesos','quesos','img-categoria-pescados-y-mariscos-pescados.jpg',10),(49,'Fiambres','fiambres','img-categoria-pescados-y-mariscos-pescados.jpg',10),(50,'Picadas','picadas','img-categoria-pescados-y-mariscos-pescados.jpg',10),(51,'Dulces','dulces','img-categoria-pescados-y-mariscos-pescados.jpg',10),(52,'Salchichas','salchichas','img-categoria-pescados-y-mariscos-pescados.jpg',10),(53,'Cremas','cremas','img-categoria-pescados-y-mariscos-pescados.jpg',11),(54,'Dulce de Leche','dulce-de-leche','img-categoria-pescados-y-mariscos-pescados.jpg',11),(55,'Leches','leches','img-categoria-pescados-y-mariscos-pescados.jpg',11),(56,'Mantecas','mantecas','img-categoria-pescados-y-mariscos-pescados.jpg',11),(57,'Yogures','yogures','img-categoria-pescados-y-mariscos-pescados.jpg',11),(58,'Hamburguesas y milanesas','hamburguesas-y-milanesas','img-categoria-pescados-y-mariscos-pescados.jpg',12),(59,'Vegetales','vegetales','img-categoria-pescados-y-mariscos-pescados.jpg',12),(60,'Papas','papas','img-categoria-pescados-y-mariscos-pescados.jpg',12),(61,'Cuidado capilar','cuidado-capilar','img-categoria-pescados-y-mariscos-pescados.jpg',13),(62,'Cuidado dela piel','cuidado-de-la-piel','img-categoria-pescados-y-mariscos-pescados.jpg',13),(63,'Cuidado personal','cuidado-personal','img-categoria-pescados-y-mariscos-pescados.jpg',13),(64,'Farmacia','farmacia','img-categoria-pescados-y-mariscos-pescados.jpg',13),(65,'Maquillaje','maquillaje','img-categoria-pescados-y-mariscos-pescados.jpg',13),(66,'Desodorantes de ambiente','desodorantes-de-ambiente','img-categoria-pescados-y-mariscos-pescados.jpg',14),(67,'Insecticidas','insecticidas','img-categoria-pescados-y-mariscos-pescados.jpg',14),(68,'Lavandina','lavandina','img-categoria-pescados-y-mariscos-pescados.jpg',14),(69,'Limpieza de baño','limpieza-de-baño','img-categoria-pescados-y-mariscos-pescados.jpg',14),(70,'Limpieza de cocina','limpieza-de-cocina','img-categoria-pescados-y-mariscos-pescados.jpg',14),(71,'Limpieza de pisos y muebles','limpieza-de-pisos-y-muebles','img-categoria-pescados-y-mariscos-pescados.jpg',14),(72,'Accesorios para mascotas','accesorios-para-mascotas','img-categoria-pescados-y-mariscos-pescados.jpg',15),(73,'Gatos','gatos','img-categoria-pescados-y-mariscos-pescados.jpg',15),(74,'Perros','perros','img-categoria-pescados-y-mariscos-pescados.jpg',15),(75,'Otros Animales','otros-animales','img-categoria-pescados-y-mariscos-pescados.jpg',15);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Rossmery','Garcia','garciarossmery@gmail.com','$2b$10$dSzKjaJXgwZRhzJ8YpbFl.ccrJo/4g31MxQAO6ysvPkWUsL2OQ.2O','default.png',NULL,NULL,NULL,NULL,'admin','2020-10-10 18:52:33','2020-10-10 18:52:33'),(2,'Alberto','Martinez','alberto@martinez.com','$2b$10$u.FRRvjuDAcQr7z28xAtv.SkTkRvrFxIuMeIkuxgDCc6izvMPbNX6','avatar1602365508332.jpg',NULL,NULL,NULL,NULL,'user','2020-10-10 21:31:48','2020-10-10 21:31:48'),(3,'micaela','mattia','tianamica37@gmail.com','$2b$10$gpTEIm9XLLRidEzwt6At5.tDgcPmoAMFaos2fp2tzo9XdUP6fui0K','avatar1602399104898.jpeg',NULL,NULL,NULL,NULL,'user','2020-10-11 06:51:45','2020-10-11 06:51:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-12  1:26:46
