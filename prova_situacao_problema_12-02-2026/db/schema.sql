CREATE DATABASE almoxarifado_db;
USE almoxarifado_db;

CREATE TABLE produtos(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
valor_unitario DECIMAL(10,2) NOT NULL,
estoque_minimo INT NOT NULL DEFAULT 0,
estoque_maximo INT NOT NULL DEFAULT 0,
creted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes(
id INT AUTO_INCREMENT PRIMARY KEY,
produto_id INT NOT NULL,
tipo ENUM('ENTRADA', 'SAIDA') NOT NULL,
quantidade INT NOT NULL,
data_movimentacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
creted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_movimentacoes_produtos
	FOREIGN KEY(produto_id) REFERENCES produtos(id)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
);



INSERT INTO produtos (nome, valor_unitario, estoque_minimo, estoque_maximo) 
VALUES('Detergente', 10, 10, 100),
('Limpa Obra', 50, 5, 50),
('Escovão', 5, 5, 20);

SELECT * FROM produtos;

INSERT INTO movimentacoes (produto_id, tipo, quantidade, data_movimentacao) VALUES
(1, 'ENTRADA', 10, '2026-01-03 09:00:00'),
(1, 'SAIDA', 3, '2026-01-10 15:10:00'),
(1, 'SAIDA', 2, '2026-01-15 11:30:00'),
(2, 'ENTRADA', 8, '2026-01-04 10:00:00'),
(2, 'SAIDA', 4, '2026-01-17 16:00:00'),
(3, 'ENTRADA', 6, '2026-01-05 08:30:00'),
(3, 'SAIDA', 1, '2026-01-20 13:15:00');



create VIEW vw_produtos as
SELECT p.id as produto_id,
p.nome,
p.valor_unitario,
SUM(
CASE 
	WHEN m.tipo = 'ENTRADA' THEN m.quantidade
    WHEN m.tipo = 'SAIDA' THEN -m.quantidade
    ELSE 0
END) as saldo_estoque,
SUM(
CASE 
	WHEN m.tipo = 'ENTRADA' THEN m.quantidade
    WHEN m.tipo = 'SAIDA' THEN -m.quantidade
    ELSE 0
END) * p.valor_unitario as valor_total_item
from produtos p
left join movimentacoes m on m.produto_id = p.id
group by p.id,
p.nome,
p.valor_unitario;
SELECT * FROM vw_produtos;


SELECT p.id AS produto_id, 
        p.nome AS produto, 
         p.valor_unitario, 
         m.quantidade_total_saida 
         FROM produtos p 
         LEFT JOIN 
        ( SELECT produto_id, SUM(quantidade) AS quantidade_total_saida 
         FROM movimentacoes 
         WHERE tipo = 'SAIDA' 
         AND data_movimentacao 
         BETWEEN "2026-01-01 00:00:00" AND "2026-12-31 23:59:59"
          GROUP BY produto_id ) m ON m.produto_id = p.id 
          ORDER BY m.quantidade_total_saida DESC;
          

SELECT * FROM produtos;

SELECT * FROM movimentacoes WHERE tipo = "SAIDA"
ORDER BY data_movimentacao DESC;

INSERT INTO movimentacoes (produto_id, tipo, quantidade, data_movimentacao) VALUES
(4, 'ENTRADA', 5, '2026-01-22 13:00:00'),
(1, 'SAIDA', 2, '2026-01-23 14:00:00');


SELECT * FROM movimentacoes


