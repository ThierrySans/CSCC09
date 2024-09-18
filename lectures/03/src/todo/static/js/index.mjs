import { getItems, addItem, deleteItem } from "/js/api.mjs";

function onError(err) {
  console.error("[error]", err);
  const error_box = document.querySelector("#error_box");
  error_box.innerHTML = err;
  error_box.style.visibility = "visible";
}

function update() {
  getItems(function (items) {
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
          deleteItem(item.id, function () {
            update();
          }, onError);
        });
      document.querySelector("#items").prepend(element);
    });
  }, 
  onError);
}

document.querySelector("#add_item").addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.querySelector("#content_form").value;
  document.querySelector("#add_item").reset();
  addItem(content, function () {
    update();
  }, onError);
});

(function refresh() {
  update();
  setTimeout(refresh, 5000);
})();
