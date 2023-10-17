CREATE DATABASE istorm;
USE istorm;

CREATE TABLE funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(255),
  salario DECIMAL(10, 2),
  cpf VARCHAR(11),
  telefone VARCHAR(15),
  endereco VARCHAR(255),
  dtAdmissao DATE,
  horasTrabalhadas DECIMAL(10, 2),
  bonus DECIMAL(10, 2),
  departamento VARCHAR(50),
  dataNascimento DATE
);