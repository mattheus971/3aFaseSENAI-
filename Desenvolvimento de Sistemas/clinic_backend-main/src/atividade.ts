class Produto {
    nome: string;
    preco: number;

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
    }

    exibirDetalhes() {
        console.log(`Produto: ${this.nome}, Preço: ${this.preco}`);
    }
}

const produto = new Produto('Honda City', 80.000)

class Categoria {
    categoria: string;
    desconto: number;

    constructor(categoria: string, desconto: number) {
        this.categoria = categoria;
        this.desconto = desconto;
    }

    calcularDesconto(produto: Produto) {
        return (produto.preco * this.desconto)/100

    }
}