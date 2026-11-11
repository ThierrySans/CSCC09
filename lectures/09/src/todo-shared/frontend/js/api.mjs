function handleReponse(res){
	if (res.status != 200) { return res.text().then(text => { throw new Error(`${text} (status: ${res.status})`)}); }
	return res.json();
}

export function signin(username, password, fail, success) {
    fetch("/signin/", {
  		method:  "POST",
  		headers: {"Content-Type": "application/json"},
  		body: JSON.stringify({ username, password }),
    })
	.then(handleReponse)
	.then(success)
	.catch(fail);
}

export function signup(username, password, fail, success) {
    fetch("/signup/", {
  		method:  "PUT",
  		headers: {"Content-Type": "application/json"},
  		body: JSON.stringify({ username, password }),
    })
	.then(handleReponse)
	.then(success)
	.catch(fail);
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

export function getCurrentUser() {
  const cookie = document.cookie.split("; ").find(value => value.startsWith("username="));
  return cookie ? decodeURIComponent(cookie.slice("username=".length)) || null : null;
}

// Lecture probe: unused exports are eliminated by the frontend build.
export function unusedTreeShakingExample() {
  return "TREE_SHAKING_DEMO_UNUSED";
}
