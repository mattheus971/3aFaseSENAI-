import { buscarProdutosPorId, produtosMaiorSaidaNoPeriodo, buscarProdutosCadastrados, cadastrarProdutos, saidasProdutosOrdem, registrarEntradas } from "./bibliotecaService.js";
import { pool } from "./config.js";

async function main() {
    // console.log(await buscarProdutosPorId(1))

    
    // const dataInicial = "2026-01-01 00:00:00";
    // const dataFinal = "2026-12-31 23:59:59";
    // console.log(await produtosMaiorSaidaNoPeriodo(dataInicial, dataFinal))

    // await buscarProdutosCadastrados()

    // await cadastrarProdutos('Vassoura', 20.00, 5, 20)

    // await saidasProdutosOrdem()

    await registrarEntradas(4, 'ENTRADA', 5, '2026-01-22 13:00:00')    
}

main().catch(error =>
    console.error(error)
).finally(async () => {
    await pool.end();
})