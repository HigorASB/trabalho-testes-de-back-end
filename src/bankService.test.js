const createBankService = require("./bankService");

beforeEach(() => {
  users = [
    { id: 1, name: "Alice", balance: 1000 },
    { id: 2, name: "Bob", balance: 500 },
  ];

  bankService = createBankService(users);
});

describe("bankService.transfer", () => {
  test("Deve transferir o valor e atualizar os saldos corretamente", () => {
    const tests = [
      { senderId: 1, receiverId: 2, amount: 0.01, newSenderBalance: 999.99 },
      { senderId: 1, receiverId: 2, amount: 50, newSenderBalance: 949.99 },
      {
        senderId: 1,
        receiverId: 2,
        amount: 949.98,
        newSenderBalance: 0.01,
      },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(true);
      expect(test.result.newSenderBalance).toBe(test.newSenderBalance);
      expect(test.result.message).toBe("Transferência realizada");
    }
  });

  test("Deve retornar saldo insuficiente", () => {
    const result = bankService.transfer(1, 2, 1000.01);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Não foi possível realizar a transferência. Saldo insuficiente"
    );
  });

  test("Deve retornar que não é possível transferir zero", () => {
    const tests = [
      { senderId: 1, receiverId: 2, amount: 0 },
      { senderId: 10000, receiverId: 1, amount: 0 },
      { senderId: 10000, receiverId: 10001, amount: 0 },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(false);
      expect(test.result.message).toBe(
        "Não foi possível realizar a transferência. O valor a ser transferido precisa ser maior que zero"
      );
    }
  });

  test("Deve retornar que não é possível transferir valores negativos", () => {
    const tests = [
      { senderId: 1, receiverId: 2, amount: -0.9 },
      { senderId: 10000, receiverId: 1, amount: -0.9 },
      { senderId: 10000, receiverId: 10001, amount: -0.9 },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(false);
      expect(test.result.message).toBe(
        "Não foi possível realizar a transferência. O valor a ser transferido precisa ser maior que zero"
      );
    }
  });

  test("Deve retornar que não é possível transferir valores nulos", () => {
    const tests = [
      { senderId: 1, receiverId: 2, amount: null },
      { senderId: 10000, receiverId: 1, amount: null },
      { senderId: 10000, receiverId: 10001, amount: null },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(false);
      expect(test.result.message).toBe(
        "Não foi possível realizar a transferência. O valor a ser transferido precisa ser maior que zero"
      );
    }
  });

  test("Deve retornar que não é possível transferir valores indefinidos", () => {
    const tests = [
      { senderId: 1, receiverId: 2, amount: undefined },
      { senderId: 10000, receiverId: 1, amount: undefined },
      { senderId: 10000, receiverId: 10001, amount: undefined },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(false);
      expect(test.result.message).toBe(
        "Não foi possível realizar a transferência. O valor a ser transferido precisa ser maior que zero"
      );
    }
  });

  test("Deve retornar que não é possível transferir valores não numéricos", () => {
    const result = bankService.transfer(1, 2, "50");

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Não foi possível realizar a transferência. O valor a ser transferido precisa ser maior que zero"
    );
  });

  test("Deve retornar que o senderId é inválido", () => {
    const tests = [
      { senderId: 10000, receiverId: 1, amount: 50 },
      { senderId: 10000, receiverId: 1, amount: 1000.1 },
      { senderId: 10000, receiverId: 10001, amount: 50 },
      { senderId: 10000, receiverId: 10001, amount: 1000.1 },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(false);
      expect(test.result.message).toBe(
        "Não foi possível realizar a transferência. Usuário não encontrado"
      );
    }
  });

  test("Deve retornar que o receiverId é inválido", () => {
    const tests = [
      { senderId: 1, receiverId: 10000, amount: 50 },
      { senderId: 1, receiverId: 10000, amount: 1000.1 },
      { senderId: 10000, receiverId: 10001, amount: 50 },
      { senderId: 10000, receiverId: 10001, amount: 1000.1 },
    ];

    for (const [i, test] of tests.entries()) {
      const { senderId, receiverId, amount } = test;
      tests[i].result = bankService.transfer(senderId, receiverId, amount);
    }

    for (const test of tests) {
      expect(test.result.success).toBe(false);
      expect(test.result.message).toBe(
        "Não foi possível realizar a transferência. Usuário não encontrado"
      );
    }
  });
});
