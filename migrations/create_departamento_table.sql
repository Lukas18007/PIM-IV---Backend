USE istorm

CREATE TABLE departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255)
)

INSERT INTO departamentos (`nome`, `localizacao`) 
VALUES ("operacional", "3 andar, sala 4"), ("gestão", "3 andar, sala 2"), 
       ("administrativo", "2 andar, sala 1"), ("RH", "1 andar, sala 1");
