const createApp = require("./api");

const PORT = process.env.PORT || 3000;

// Simulação de Banco de Dados em Memória
const users = [
  { id: 1, name: "Alice", balance: 1000 },
  { id: 2, name: "Bob", balance: 500 },
];

const app = createApp(users);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});
