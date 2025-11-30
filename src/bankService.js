const bankService = (users) => ({
  getBalance: (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.balance : null;
  },

  transfer: (senderId, receiverId, amount) => {
    if (amount <= 0 || !amount || typeof amount !== "number") {
      return {
        success: false,
        message:
          "Não foi possível realizar a transferência. O valor a ser transferido precisa ser maior que zero",
      };
    }

    const sender = users.find((u) => u.id == senderId);
    const receiver = users.find((u) => u.id == receiverId);

    if (!sender || !receiver) {
      return {
        success: false,
        message:
          "Não foi possível realizar a transferência. Usuário não encontrado",
      };
    }

    if (sender.balance < amount) {
      return {
        success: false,
        message:
          "Não foi possível realizar a transferência. Saldo insuficiente",
      };
    }

    const senderBalanceInCents = Math.round(sender.balance * 100);
    const receiverBalanceInCents = Math.round(receiver.balance * 100);
    const amountInCents = Math.round(amount * 100);

    const newSenderBalanceInCents = senderBalanceInCents - amountInCents;
    const newReceiverBalanceInCents = receiverBalanceInCents + amountInCents;

    sender.balance = newSenderBalanceInCents / 100;
    receiver.balance = newReceiverBalanceInCents / 100;

    return {
      success: true,
      newSenderBalance: sender.balance,
      message: "Transferência realizada",
    };
  },
});

module.exports = bankService;
