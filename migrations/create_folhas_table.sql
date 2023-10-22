USE istorm;

CREATE TABLE folhasPagto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcionario INT,
    imposto DECIMAL(5, 2),
    vlImposto DECIMAL(10, 2),
    recebimento DECIMAL(10, 2),
    FOREIGN KEY (funcionario) REFERENCES funcionarios(id)
);