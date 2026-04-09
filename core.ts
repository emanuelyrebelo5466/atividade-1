const filename = __dirname + '/data.todo.json';
let list: string[]  = null!;

async function loadFromFile() {
  if (list !== null)
    return
  try {
    const file = Bun.file(filename);
    const content = await file.text();
    list = JSON.parse(content) as string[];
  } catch (error: any) {
    Bun.write(filename, "[]");
    list = [];
  }
}

async function saveToFile() {
  await Bun.write(filename, JSON.stringify(list));
}

// CRUD - CREATE
export async function addItem(item: string) {
  await loadFromFile();
  list.push(item);
  await saveToFile();
}

// CRUD - READ
export async function getItems() {
  await loadFromFile();
  return list;
}

// CRUD - UPDATE
export async function updateItem(index: number, newItem: string) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites");
  list[index] = newItem;
  await saveToFile();
}

// CRUD - DELETE
export async function removeItem(index: number) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites");
  list.splice(index, 1);
  await saveToFile();
}

// EXPORTA AS FUNÇÕES PARA USO EXTERNO
export default { addItem, getItems, updateItem, removeItem };

type Todo = {
  text: string;
  done: boolean;
};

const filename = new URL('./data.todo.json', import.meta.url).pathname;

let list: Todo[] | null = null;

async function loadFromFile() {
  if (list !== null) return;

  try {
    const file = Bun.file(filename);
    const content = await file.text();
    list = JSON.parse(content);
  } catch {
    await Bun.write(filename, "[]");
    list = [];
  }
}

async function saveToFile() {
  await Bun.write(filename, JSON.stringify(list, null, 2));
}

// CREATE
export async function addItem(text: string) {
  await loadFromFile();
  list!.push({ text, done: false });
  await saveToFile();
}

// READ
export async function getItems() {
  await loadFromFile();
  return list!;
}

// UPDATE TEXTO
export async function updateItem(index: number, newText: string) {
  await loadFromFile();
  if (index < 0 || index >= list!.length)
    throw new Error("Índice inválido");

  list![index].text = newText;
  await saveToFile();
}

// DELETE
export async function removeItem(index: number) {
  await loadFromFile();
  if (index < 0 || index >= list!.length)
    throw new Error("Índice inválido");

  list!.splice(index, 1);
  await saveToFile();
}

export async function toggleDone(index: number) {
  await loadFromFile();
  if (index < 0 || index >= list!.length)
    throw new Error("Índice inválido");

  list![index].done = !list![index].done;
  await saveToFile();
}

export async function clearAll() {
  list = [];
  await saveToFile();
}

export default {
  addItem,
  getItems,
  updateItem,
  removeItem,
  toggleDone,
  clearAll
};