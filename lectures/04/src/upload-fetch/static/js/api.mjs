function handleReponse(res){
	if (res.status != 200) { return res.text().then(text => { throw new Error(`${text} (status: ${res.status})`)}); }
	return res.json();
}

export function getUsers(fail, success) {
  fetch("/api/users/")
	.then(handleReponse)
    .then(success)
    .catch(fail); 
}

export function addUser(username, picture, fail, success) {
	const data = new FormData();
	data.append("username", username);
	data.append("picture", picture);
	fetch( "/api/users/", {
	  method: "POST",
  	  body: data
	})
	.then(handleReponse)
    .then(success)
    .catch(fail); 
}
