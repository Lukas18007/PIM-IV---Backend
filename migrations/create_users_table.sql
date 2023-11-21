use istorm;

CREATE TABLE tipos_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(30)
);

INSERT INTO tipos_usuario (descricao) VALUES ("funcionario"), ("gerente");

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo INT,
    departamento INT,
    senha VARCHAR(255),
    FOREIGN KEY (tipo) REFERENCES tipos_usuario(id),
    FOREIGN KEY (departamento) REFERENCES departamento(id)
);