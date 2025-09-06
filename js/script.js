// Pega referências dos elementos
const form = document.getElementById("form-reposicao");
const tabela = document.getElementById("lista-capinhas");

// Carregar dados do localStorage
let estoque = JSON.parse(localStorage.getItem("estoqueCapinhas")) || [];

// Renderizar estoque na tabela
function renderTabela() {
  tabela.innerHTML = "";
  estoque.forEach((item, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${item.modelo}</td>
      <td>${item.quantidade}</td>
      <td>${item.data}</td>
      <td>
        <button class="acao editar" onclick="editar(${index})">Editar</button>
        <button class="acao excluir" onclick="excluir(${index})">Excluir</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

// Adicionar nova reposição
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const modelo = document.getElementById("modelo").value.trim();
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const data = new Date().toLocaleDateString();

  if (modelo && quantidade > 0) {
    estoque.push({ modelo, quantidade, data });
    salvar();
    renderTabela();
    form.reset();
  } else {
    alert("Preencha os campos corretamente!");
  }
});

// Editar item
function editar(index) {
  const novoValor = prompt("Digite a nova quantidade:", estoque[index].quantidade);
  if (novoValor !== null && !isNaN(novoValor) && novoValor > 0) {
    estoque[index].quantidade = parseInt(novoValor);
    estoque[index].data = new Date().toLocaleDateString();
    salvar();
    renderTabela();
  }
}

// Excluir item
function excluir(index) {
  if (confirm("Tem certeza que deseja excluir este item?")) {
    estoque.splice(index, 1);
    salvar();
    renderTabela();
  }
}

// Salvar no localStorage
function salvar() {
  localStorage.setItem("estoqueCapinhas", JSON.stringify(estoque));
}

// Inicializar
renderTabela();
