export function saveToLocal(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadFromLocal() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
