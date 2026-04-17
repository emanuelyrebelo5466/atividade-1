import todo from "./core.ts";

async function main() {
  const command = process.argv[3];

  if (command === "add") {
    const item = process.argv[4];
    if (!item) throw new Error("Forneça um item");

    await todo.addItem(item);
    console.log("Item adicionado!");
    return;
  }

  if (command === "list") {
    const items = await todo.getItems();

    if (items.length === 0) {
      console.log("Lista vazia.");
      return;
    }

    items.forEach((item, i) => {
      const status = item.done ? "✔" : " ";
      console.log(`[${status}] ${i}: ${item.text}`);
    });
    return;
  }

  if (command === "done") {
    const index = parseInt(process.argv[4]);
    if (isNaN(index)) throw new Error("Índice inválido");

    await todo.toggleDone(index);
    console.log("Status alterado!");
    return;
  }

  if (command === "clear") {
    await todo.clearAll();
    console.log("Lista limpa!");
    return;
  }

  if (command === "update") {
    const index = parseInt(process.argv[4]);
    const text = process.argv[5];

    if (isNaN(index) || !text) throw new Error("Uso: update <index> <texto>");

    await todo.updateItem(index, text);
    console.log("Atualizado!");
    return;
  }

  if (command === "remove") {
    const index = parseInt(process.argv[4]);
    if (isNaN(index)) throw new Error("Índice inválido");

    await todo.removeItem(index);
    console.log("Removido!");
    return;
  }

  console.log("Comandos: add, list, update, remove, done, clear");
}

main().catch((err) => {
  console.error(err.message);
});
