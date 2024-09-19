-- Criação da tabela Administrador
CREATE TABLE Administrador (
    id_administrador INT AUTO_INCREMENT PRIMARY KEY,
    nome_administrador VARCHAR(255) NOT NULL,
    email_administrador VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela Autor
CREATE TABLE Autor (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    matricula_autor VARCHAR(10) NOT NULL,
    nome_autor VARCHAR(255) NOT NULL,
    email_autor VARCHAR(255) NOT NULL
);

-- Criação da tabela Curso
CREATE TABLE Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nome_curso VARCHAR(255) NOT NULL
);

-- Criação da tabela Orientador
CREATE TABLE Orientador (
    id_orientador INT AUTO_INCREMENT PRIMARY KEY,
    matricula_orientador VARCHAR(10) NOT NULL,
    nome_orientador VARCHAR(255) NOT NULL,
    titulacao VARCHAR(100) NOT NULL,
    area_atuacao VARCHAR(255) NOT NULL,
    email_orientador VARCHAR(255) NOT NULL
);

-- Criação da tabela Coorientador
CREATE TABLE Coorientador (
    id_coorientador INT AUTO_INCREMENT PRIMARY KEY,
    matricula_coorientador VARCHAR(10) NOT NULL,
    nome_coorientador VARCHAR(255) NOT NULL,
    titulacao VARCHAR(100) NOT NULL,
    area_atuacao VARCHAR(255) NOT NULL,
    email_coorientador VARCHAR(255) NOT NULL
);

-- Criação da tabela Obra
CREATE TABLE Obra (
    id_obra INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    data_apresentacao DATE NOT NULL,
    resumo TEXT(1000) NOT NULL,
    palavras_chave VARCHAR(255) NOT NULL,
    arquivo BLOB NOT NULL,
    fk_id_curso INT,
    fk_id_orientador INT,
    fk_id_autor INT,
    FOREIGN KEY (fk_id_curso) REFERENCES Curso(id_curso),
    FOREIGN KEY (fk_id_orientador) REFERENCES Orientador(id_orientador),
    FOREIGN KEY (fk_id_autor) REFERENCES Autor(id_autor)
);

-- Criação da tabela ObraCoorientador
CREATE TABLE ObraCoorientador (
    fk_id_obra INT,
    fk_id_coorientador INT,
    PRIMARY KEY (fk_id_obra, fk_id_coorientador),
    FOREIGN KEY (fk_id_obra) REFERENCES Obra(id_obra),
    FOREIGN KEY (fk_id_coorientador) REFERENCES Coorientador(id_coorientador)
);

-- Criação da tabela LogAcoes
CREATE TABLE LogAcoes (
    id_log_acoes INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_administrador INT,
    fk_id_obra INT,
    acao VARCHAR(45) NOT NULL,
    data_registro DATETIME NOT NULL,
    descricao TEXT(1000) NOT NULL,
    FOREIGN KEY (fk_id_administrador) REFERENCES Administrador(id_administrador),
    FOREIGN KEY (fk_id_obra) REFERENCES Obra(id_obra)
);
