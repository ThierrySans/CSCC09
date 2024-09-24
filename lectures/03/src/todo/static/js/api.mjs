function unhandledStatus(fail){
	return function(status){
		return fail(`unhandled status code (${status})`);
	};
}

export function addItem(content, fail, success) {
    fetch("/api/items/", {
  		method:  "POST",
  		headers: {"Content-Type": "application/json"},
  		body: JSON.stringify({ content: content }),
    })
    .then(function(response){
  	 	if (response.status != 200) { throw response.status; }
  	 	return response.json();
    })
    .then(success)
    .catch(unhandledStatus(fail)); 
}

export function deleteItem(itemId, fail, success) {
	fetch("/api/items/" + itemId, {
		method:  "DELETE",
	})
	.then(function(response){
		if (response.status == 404) { return fail(`item id ${itemId} not found (404)`); }
		if (response.status != 200) { throw response.status; }
		return success();
	 })
	 .catch(unhandledStatus(fail)); 
}

export function getItems(fail, success) {
  fetch("/api/items/")
	.then(function(response){
  	 	if (response.status != 200) { throw response.status; }
  	 	return response.json();
    })
    .then(success)
    .catch(unhandledStatus(fail)); 
}
