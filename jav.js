const localStorageKey = "to-do-list"; //  variável para localStorage

function validateIfExistsNewTask() { // função para validar se já existe uma nova tarefa com o mesmo nome no localStorage
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Obter os valores do localStorage e analise-os como JSON. Se não existir, usa array vazio
  let inputValue = document.getElementById("input-new-task").value; // Obter o valor do campo de entrada 
  let exists = values.find((x) => x.name == inputValue); // Verifica se existe uma tarefa com o mesmo nome de inputValue no array de valores
  return !exists ? false : true; // Retorna verdadeiro se existir, indicando que já existe uma tarefa com o mesmo nome, caso contrário retorna falso
}

function newTask() { // função para adicionar uma nova tarefa
  let input = document.getElementById("input-new-task"); // Obter o elemento de entrada 
  input.style.border = ""; // Remove qualquer estilo de borda anterior da entrada

  if (!input.value) { // Validação
    input.style.border = "1px solid red"; // Se a entrada estiver vazia, adicione uma borda vermelha para indicar um erro e mostrar um alerta
    alert("Digite algo para inserir em sua lista");
  } else if (validateIfExistsNewTask()) { // Se já existir uma tarefa com o mesmo nome, mostra um alerta
    alert("Já existe uma task com essa descrição");
  } else {
    // incrementar ao localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Se a validação for aprovada, adicione a nova tarefa ao localStorage
    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues(); // Chamar função showValues ​​para atualizar a lista de tarefas exibida
  }
  input.value = ""; // Limpa o campo de entrada
}

function showValues() { // função para exibir as tarefas do localStorage
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Obter as tarefas do localStorage e analise-as como JSON. Se não existir, usa um array vazio
  let list = document.getElementById("to-do-list"); // Obter o elemento da lista
  list.innerHTML = ""; // Limpar o HTML interno da lista para preparar a nova renderização
  for (let i = 0; i < values.length; i++) { // Percorrer as tarefas e criar elementos HTML para exibi-los em uma lista com botões de remoção
    list.innerHTML += `<li>${values[i]["name"]}<button id='btn-ok' onclick='removeItem("${values[i]["name"]}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`;
  }
}

function removeItem(data) { // função para remover uma tarefa do localStorage
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Obter as tarefas do localStorage e analise-as como JSON. Se não existir, use um array vazio
  let index = values.findIndex((x) => x.name == data); // Encontrar o índice da tarefa com o nome especificado no array de valores
  values.splice(index, 1); // Remover a tarefa do array usando splice
  localStorage.setItem(localStorageKey, JSON.stringify(values)); // Atualiza o localStorage com o array modificado
  showValues(); // Chamar a função ​​para atualizar a lista de tarefas exibida
} 

showValues(); // Chamar a função ​​para iniciar as tarefas
