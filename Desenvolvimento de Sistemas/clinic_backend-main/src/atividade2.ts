class Funcionario {
  nome: string;
  salarioBase: number;

  constructor(nome: string) {
    this.nome = nome;
    this.salarioBase = 2000;
  }

  exibirDetalhes() {
    console.log(`Nome: ${this.nome}, Salario Base: ${this.salarioBase}`);
  }
}

class Programador extends Funcionario {
  calcularSalario(): number {
    return this.salarioBase * 0.2 + this.salarioBase;
  }
}

class Designer extends Funcionario {
  calcularSalario(): number {
    return this.salarioBase * 0.5 + this.salarioBase;
  }
}

const dev1 = new Programador("Matheus");
const dev2 = new Programador("Joao");
const designer1 = new Designer("Felipe");
const designer2 = new Designer("Prof");

console.log(dev1.nome, dev1.calcularSalario());
console.log(dev2.nome, dev2.calcularSalario());
console.log(designer1.nome, designer1.calcularSalario());
console.log(designer2.nome, designer2.calcularSalario());