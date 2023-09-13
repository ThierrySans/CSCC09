if (!localStorage.getItem("todo")) {
  localStorage.setItem("todo", JSON.stringify({ next: 0, items: [] }));
}

/*  ******* Data types *******
    
    item objects must have at least the following attributes:
        - (String) itemId 
        - (String) content

****************************** */

// get all items
export function getItems() {
  const todo = JSON.parse(localStorage.getItem("todo"));
  return todo.items;
}

// add an item
export function addItem(content) {
  const todo = JSON.parse(localStorage.getItem("todo"));
  const item = { id: todo.next++, content: content };
  todo.items.push(item);
  localStorage.setItem("todo", JSON.stringify(todo));
}

// delete an item given its itemId
export function deleteItem(itemId) {
  const todo = JSON.parse(localStorage.getItem("todo"));
  const index = todo.items.findIndex(function (item) {
    return item.id == itemId;
  });
  if (index == -1) return null;
  const item = todo.items[index];
  todo.items.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo));
}
