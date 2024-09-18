export function addItem(content, success, failure) {
    fetch("/api/items/", {
  		method:  "POST",
  		headers: {"Content-Type": "application/json"},
  		body: JSON.stringify({ content: content }),
    })
    .then(function(response){
  	 	if (response.status != 200) { throw new Error(response.status); }
  	 	else { return response.json(); }
    })
    .then(success)
    .catch(failure);
}

export function deleteItem(itemId, success, failure) {
	fetch("/api/items/" + itemId, {
		method:  "DELETE",
	})
	.then(function(response){
		 	if (response.status != 200) { throw new Error(response.status); }
		 	return success();
	 })
	 .catch(failure); 
}

export function getItems(success, failure) {
  fetch("/api/items/")
	.then(function(response){
  	 	if (response.status != 200) { throw new Error(response.status); }
  	 	else { return response.json(); }
    })
    .then(success)
    .catch(failure); 
}
