function handleReponse(res){
	if (res.status != 200) { return res.text().then(text => { throw new Error(`${text} (status: ${res.status})`)}); }
	return res.json();
}

export function addItem(content, fail, success) {
    fetch("/api/items/", {
  		method:  "POST",
  		headers: {"Content-Type": "application/json"},
  		body: JSON.stringify({ content: content }),
    })
	.then(handleReponse)
	.then(success)
	.catch(fail); 
}

export function deleteItem(itemId, fail, success) {
	fetch("/api/items/" + itemId, {
		method:  "DELETE",
	})
	.then(handleReponse)
	.then(success)
	.catch(fail); 
}

export function getItems(page, fail, success) {
  fetch(`/api/items/?page=${page}`)
	.then(handleReponse)
	.then(success)
	.catch(fail); 
}
