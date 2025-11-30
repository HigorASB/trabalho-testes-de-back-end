const request = require("supertest");
const createApp = require("./api");

const INITIAL_USERS_DATA = [
  { id: 1, name: "Alice", balance: 1000.0 },
  { id: 2, name: "Bob", balance: 500.0 },
];

describe("POST /transfer", () => {
  let app;
  let testUsers;

  beforeEach(() => {
    testUsers = JSON.parse(JSON.stringify(INITIAL_USERS_DATA));

    app = createApp(testUsers);
  });

  test("Deve retornar HTTP 200 e atualizar saldos para uma transferência válida", async () => {
    const transferAmount = 100.0;
    const transferData = { senderId: 1, receiverId: 2, amount: transferAmount };

    const response = await request(app)
      .post("/transfer")
      .send(transferData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.newSenderBalance).toBe(900.0);

    const sender = testUsers.find((u) => u.id === 1);
    const receiver = testUsers.find((u) => u.id === 2);

    expect(sender.balance).toBe(900.0);
    expect(receiver.balance).toBe(600.0);
  });

  test("Deve retornar HTTP 400 se faltar o campo amount no JSON", async () => {
    const transferData = { senderId: 1, receiverId: 2 };

    const response = await request(app)
      .post("/transfer")
      .send(transferData)
      .expect(400);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toContain(
      "O campo de valor da transferência é obrigatório."
    );
  });

  test("Deve retornar HTTP 400 se o remetente não for encontrado", async () => {
    const transferData = { senderId: 99, receiverId: 2, amount: 10.0 };

    const response = await request(app)
      .post("/transfer")
      .send(transferData)
      .expect(400);

    expect(response.body.message).toBe(
      "Não foi possível realizar a transferência. Usuário não encontrado"
    );
  });
});
