// Simba

let repeat = true;
let balance = 0;
const statement: { operation: "Depósito" | "Saque"; amount: number }[] = [];

const utility = {
  cancel: function () {
    const response = confirm("Deseja realmente cancelar?");

    if (!response) {
      return false;
    }

    alert("Operação cancelada.");
    return true;
  },
  parse: function (value: string | any) {
    if (value === "") {
      alert("Informe um valor.");
      return false;
    } else if (!(value > 0)) {
      alert("Digite um valor válido.");
      return false;
    }

    return true;
  },
};

const operations = {
  check: function () {
    alert("Saldo atual: R$ " + balance);
  },
  deposit: function () {
    const amount = prompt("Digite o valor do depósito:");

    if (amount === null) {
      const response = utility.cancel();

      if (!response) {
        operations.deposit();
      }

      return;
    }

    const parsed = utility.parse(amount);

    if (!parsed) {
      operations.deposit();
    }

    balance += +amount;
    operations.check();

    statement[statement.length] = {
      operation: "Depósito",
      amount: +amount,
    };
  },
  cashout: function () {
    const amount = prompt("Digite o valor do saque:");

    if (amount === null) {
      const response = utility.cancel();

      if (!response) {
        operations.cashout();
      }
      return;
    }
    const parsed = utility.parse(amount);
    if (!parsed) {
      operations.cashout();
    }

    if (+amount > balance) {
      alert("Saldo insuficiente.");
      operations.cashout();
      return;
    }

    balance -= +amount;
    operations.check();

    statement[statement.length] = {
      operation: "Saque",
      amount: +amount,
    };
  },
  statement: function () {
    let mensagem = "";
    let entrada = 0;
    let saida = 0;

    if (statement.length === 0) {
      alert("Ainda nao existem operações no seu extrato.");
      return;
    }

    for (let i = 0; i < statement.length; i++) {
      mensagem += statement[i].operation + ": R$" + statement[i].amount + "\n";

      if (statement[i].operation === "Depósito") {
        entrada += statement[i].amount;
      } else {
        saida += statement[i].amount;
      }
    }

    mensagem += "\nTotal de entrada: R$" + entrada;
    mensagem += "\nTotal de saída: R$" + saida;

    alert(mensagem);
  },
  exit: function () {
    alert("Foi um prazer atendê-lo.");
    repeat = false;
  },
  invalid: function () {
    alert("Operação inválida.");
  },
};
function run() {
  const username = prompt("Digite seu nome:");

  if (username === null) {
    const response = utility.cancel();

    if (response === false) {
      run();
    }

    return;
  }

  const parseName = username ? username : "usuário";

  alert("Olá, " + parseName + "! Bem vindo ao Simba.");

  while (repeat) {
    const operation = prompt(
      "Selecione uma operação:\n\n1. Consultar\n2. Depositar\n3. Sacar\n4. Extrato\n5. Sair",
    );

    if (operation === "") {
      alert("Selecione uma das operações.");
      continue;
    } else if (operation !== null) {
      const parsed = +operation;

      switch (parsed) {
        case 1:
          operations.check();
          break;
        case 2:
          operations.deposit();
          break;
        case 3:
          operations.cashout();
          break;
        case 4:
          operations.statement();
          break;
        case 5:
          operations.exit();
          break;
        default:
          operations.invalid();
      }

      continue;
    }

    alert("Operação cancelada.");
    repeat = false;
  }
}

run();
