const item = document.querySelector("input#item");
const btn = document.querySelector("button.btn");
const ul = document.querySelector("ul");
let itensComplete = 0;

btn.addEventListener("click", validateLi);
item.addEventListener("keypress", validateLiEnter);

const itens = [];

function createNewItem() {
  let itemText = item.value;
  let li = document.createElement("li");
  let itemTextNode = document.createTextNode(itemText);
  let div = document.createElement("div");
  let closeButton = document.createTextNode("×");

  // testar se a tarefa já está escrita
  if (itens.includes(itemText.toLowerCase())) {
    alert("Essa tarefa já foi gravada! :)");
    item.focus();
    item.value = "";
    return;
  }

  div.appendChild(closeButton);
  div.classList.add("close-btn");
  div.setAttribute("close", "");

  li.appendChild(div);
  li.appendChild(itemTextNode);
  ul.appendChild(li);

  itens.push(itemText);

  removeItem();
  completeItem();
  item.value = "";
}

function removeItem() {
  document.querySelectorAll("[close]").forEach((closeBtn) => {
    closeBtn.onclick = () => {
      let li = closeBtn.parentElement;
      itens.forEach((elem, index) => {
        if ("×" + elem == li.textContent) {
          itens.splice(index, 1);
        }
      });
      ul.removeChild(li);
    };
  });
}

function completeItem() {
  document.querySelectorAll("li").forEach((item) => {
    item.onclick = () => {
      if (!item.classList.contains("done-item")) {
        itensComplete++;
      }
      item.classList.add("done-item");
    };
  });
}

function validateLi() {
  if (item.value) {
    createNewItem();
  }
}

function validateLiEnter(e) {
  if (item.value && e.which === 13) {
    createNewItem();
  }
}
