import { getItems, addItem, deleteItem } from "/js/api.mjs";

function update() {
  const items = getItems();
  document.querySelector("#items").innerHTML = "";
  items.forEach(function (item) {
    const element = document.createElement("div");
    element.className = "item";
    element.innerHTML = `
            <div class="item_content">${item.content}</div>
            <div class="delete-icon icon"></div>
        `;
    element
      .querySelector(".delete-icon")
      .addEventListener("click", function (e) {
        deleteItem(item.id);
        update();
      });
    document.querySelector("#items").prepend(element);
  });
}

document.querySelector("#add_item").addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.querySelector("#content_form").value;
  document.querySelector("#add_item").reset();
  addItem(content);
  update();
});

update();
