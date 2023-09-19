import { getItems, addItem, deleteItem } from "/js/api.mjs";

function onError(err) {
  console.error("[error]", err);
  const error_box = document.querySelector("#error_box");
  error_box.innerHTML = err;
  error_box.style.visibility = "visible";
}

function update() {
  getItems(function (err, items) {
    if (err) return onError(err);
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
          deleteItem(item.id, function (err) {
            if (err) return onError(err);
            update();
          });
        });
      document.querySelector("#items").prepend(element);
    });
  });
}

document.querySelector("#add_item").addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.querySelector("#content_form").value;
  document.querySelector("#add_item").reset();
  addItem(content, function (err) {
    if (err) return onError(err);
    update();
  });
});

(function refresh() {
  update();
  setTimeout(refresh, 5000);
})();
