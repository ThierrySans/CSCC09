fetch("http://localhost:3001/", {
	credentials: 'include',
})
.then(function(response){
	return response.text();
})
.then(function(res){
	document.getElementById("result").innerHTML = res;
})


