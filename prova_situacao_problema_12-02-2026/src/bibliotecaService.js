import { pool } from "./config.js"

export async function buscarProdutosPorId(produtosId) {
    const [rows] = await pool.query("SELECT * from produtos WHERE id=?",
        [produtosId]
    )
    return rows[0] 
}

export async function produtosMaiorSaidaNoPeriodo(dataInicial, dataFinal) {
    const [rows] = await pool.query(`SELECT p.id AS produto_id, 
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
          ORDER BY m.quantidade_total_saida DESC`,
        [dataInicial, dataFinal]);
    return rows.map((item) => {
        const quantidade = item.quantidade_total_saida; 
        const valorUnitario = item.valor_unitario;
        return { 
            produto: item.produto, 
            quantidade_total_saida: quantidade, 
            valor_total_financeiro_saidas: quantidade * valorUnitario 
        };
    });
}

export async function buscarProdutosCadastrados() {
    const [rows] = await pool.query("SELECT * FROM produtos",
    )
    console.log(rows);
    return rows[0] 
}

export async function cadastrarProdutos(nome, valor_unitario, estoque_minimo, estoque_maximo) {
    const [rows] = await pool.query("INSERT INTO produtos (nome, valor_unitario, estoque_minimo, estoque_maximo) VALUES (?, ?, ?, ?)",
        [nome, valor_unitario, estoque_minimo, estoque_maximo]
    )
    console.log(rows);
    return rows[0] 
}

export async function saidasProdutosOrdem() {
    const [rows] = await pool.query("SELECT * FROM movimentacoes WHERE tipo = 'SAIDA' ORDER BY data_movimentacao DESC",
    )
    console.log(rows);
    return rows[0] 
}

export async function registrarEntradas(produto_id, tipo, quantidade, data_movimentacao) {
    const [rows] = await pool.query("INSERT INTO movimentacoes (produto_id, tipo, quantidade, data_movimentacao) VALUES (?, ?, ?, ?)",
        [produto_id, tipo, quantidade, data_movimentacao]
    )
    console.log(rows);
    return rows[0] 
}































// import { pool } from "./config.js"

// export async function buscarLivroPorId(livroId) {
//     const [rows] = await pool.query("SELECT * from livros WHERE id=?",
//         [livroId]
//     )
//     return rows[0]
// }

// export async function livrosMaiorSaidaNoPeriodo(dataInicial, dataFinal) {
//     const [rows] = await pool.query(`SELECT l.id AS livro_id, 
//         l.titulo AS livro, 
//         l.valor_unitario, 
//         m.quantidade_total_saida 
//         FROM livros l 
//         LEFT JOIN 
//         ( SELECT livro_id, SUM(quantidade) AS quantidade_total_saida 
//          FROM movimentacoes 
//          WHERE tipo = 'SAIDA' 
//          AND data_movimentacao 
//          BETWEEN ? AND ? 
//          GROUP BY livro_id ) m ON m.livro_id = l.id 
//          ORDER BY m.quantidade_total_saida DESC`,
//         [dataInicial, dataFinal]);
//     return rows.map((item) => {
//         const quantidade = item.quantidade_total_saida; 
//         const valorUnitario = item.valor_unitario;
//         return { 
//             livro: item.livro, 
//             quantidade_total_saida: quantidade, 
//             valor_total_financeiro_saidas: quantidade * valorUnitario 
//         };
//     });
// } 
