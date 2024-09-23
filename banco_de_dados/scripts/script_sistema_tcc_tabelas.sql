-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Schema sistema_tcc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sistema_tcc` DEFAULT CHARACTER SET utf8;
USE `sistema_tcc`;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`Administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`Administrador` (
  `id_administrador` INT NOT NULL AUTO_INCREMENT,
  `nome_administrador` VARCHAR(255) NOT NULL,
  `email_administrador` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_administrador`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`Curso` (
  `id_curso` INT NOT NULL AUTO_INCREMENT,
  `nome_curso` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_curso`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`Orientador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`Orientador` (
  `id_orientador` INT NOT NULL AUTO_INCREMENT,
  `matricula_orientador` VARCHAR(10) NOT NULL,
  `nome_orientador` VARCHAR(255) NOT NULL,
  `titulacao` VARCHAR(100) NOT NULL,
  `area_atuacao` VARCHAR(255) NOT NULL,
  `email_orientador` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_orientador`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`Autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`Autor` (
  `id_autor` INT NOT NULL AUTO_INCREMENT,
  `matricula_autor` VARCHAR(10) NOT NULL,
  `nome_autor` VARCHAR(255) NOT NULL,
  `email_autor` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_autor`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`Obra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`Obra` (
  `id_obra` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(255) NOT NULL,
  `data_apresentacao` DATE NOT NULL,
  `resumo` TEXT(1000) NOT NULL,
  `palavras_chave` VARCHAR(255) NOT NULL,
  `arquivo` LONGBLOB NOT NULL,
  `fk_id_curso` INT NOT NULL,
  `fk_id_orientador` INT NOT NULL,
  `fk_id_autor` INT NOT NULL,
  PRIMARY KEY (`id_obra`),
  INDEX `fk_Tcc_Curso_idx` (`fk_id_curso` ASC) VISIBLE,
  INDEX `fk_Tcc_Orientador1_idx` (`fk_id_orientador` ASC) VISIBLE,
  INDEX `fk_Obra_Autor1_idx` (`fk_id_autor` ASC) VISIBLE,
  CONSTRAINT `fk_Tcc_Curso`
    FOREIGN KEY (`fk_id_curso`)
    REFERENCES `sistema_tcc`.`Curso` (`id_curso`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE, -- Se o ID do curso for alterado, ele será atualizado nas obras
  CONSTRAINT `fk_Tcc_Orientador1`
    FOREIGN KEY (`fk_id_orientador`)
    REFERENCES `sistema_tcc`.`Orientador` (`id_orientador`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE, -- Se o ID do orientador for alterado, ele será atualizado nas obras
  CONSTRAINT `fk_Obra_Autor1`
    FOREIGN KEY (`fk_id_autor`)
    REFERENCES `sistema_tcc`.`Autor` (`id_autor`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE) -- Se o ID do autor for alterado, ele será atualizado nas obras
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`LogAcoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`LogAcoes` (
  `id_log_acoes` INT NOT NULL AUTO_INCREMENT,
  `fk_id_administrador` INT NOT NULL,
  `fk_id_obra` INT NOT NULL,
  `acao` VARCHAR(45) NOT NULL,
  `data_registro` DATETIME NOT NULL,
  `descricao` TEXT(1000) NOT NULL,
  PRIMARY KEY (`id_log_acoes`),
  INDEX `fk_Administrador_has_Tcc_Tcc1_idx` (`fk_id_obra` ASC) VISIBLE,
  INDEX `fk_Administrador_has_Tcc_Administrador1_idx` (`fk_id_administrador` ASC) VISIBLE,
  CONSTRAINT `fk_Administrador_has_Tcc_Administrador1`
    FOREIGN KEY (`fk_id_administrador`)
    REFERENCES `sistema_tcc`.`Administrador` (`id_administrador`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE, -- Se o ID do administrador for alterado, ele será atualizado nos logs
  CONSTRAINT `fk_Administrador_has_Tcc_Tcc1`
    FOREIGN KEY (`fk_id_obra`)
    REFERENCES `sistema_tcc`.`Obra` (`id_obra`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE) -- Se o ID da obra for alterado, ele será atualizado nos logs
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`Coorientador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`Coorientador` (
  `id_coorientador` INT NOT NULL AUTO_INCREMENT,
  `matricula_coorientador` VARCHAR(10) NOT NULL,
  `nome_coorientador` VARCHAR(255) NOT NULL,
  `titulacao` VARCHAR(100) NOT NULL,
  `area_atuacao` VARCHAR(255) NOT NULL,
  `email_coorientador` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_coorientador`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sistema_tcc`.`ObraCoorientador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_tcc`.`ObraCoorientador` (
  `fk_id_obra` INT NOT NULL,
  `fk_id_coorientador` INT NOT NULL,
  PRIMARY KEY (`fk_id_obra`, `fk_id_coorientador`),
  INDEX `fk_Obra_has_Coorientador_Coorientador1_idx` (`fk_id_coorientador` ASC) VISIBLE,
  INDEX `fk_Obra_has_Coorientador_Obra1_idx` (`fk_id_obra` ASC) VISIBLE,
  CONSTRAINT `fk_Obra_has_Coorientador_Obra1`
    FOREIGN KEY (`fk_id_obra`)
    REFERENCES `sistema_tcc`.`Obra` (`id_obra`)
    ON DELETE CASCADE -- Se a obra for excluída, a relação com o coorientador também será excluída
    ON UPDATE CASCADE, -- Se o ID da obra for alterado, ele será atualizado na tabela de relação
  CONSTRAINT `fk_Obra_has_Coorientador_Coorientador1`
    FOREIGN KEY (`fk_id_coorientador`)
    REFERENCES `sistema_tcc`.`Coorientador` (`id_coorientador`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE) -- Se o ID do coorientador for alterado, ele será atualizado na tabela de relação
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
