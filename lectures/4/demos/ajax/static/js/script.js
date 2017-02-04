(function(){
    
    var updateProfile = function(url, username){
        var img = new Image();
		img.src = url;
        img.alt = username;
        var span = document.createElement('span');
        span.innerHTML = username;
        var result = document.getElementById("result");
        result.innerHTML = "";
        result.appendChild(img);
        result.appendChild(span);
    };
    
    document.getElementsByName('picture')[0].onchange = function(e){
		var file = e.target.files[0];
		if (file.type.match(/image.*/)) {
			var reader = new FileReader();
			reader.onload = function(e) {
                updateProfile(reader.result, "PREVIEW");
			};
			reader.readAsDataURL(file);	
		}
    }

    var fetchProfile = function(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                if (this.status === 200){
                    var profile = JSON.parse(this.responseText);
                    updateProfile("/api/profile/picture/", profile.username); 
                }
            }
        };
        xhr.open("GET", "/api/profile/", true);
        xhr.send();
    }
    
    document.getElementsByTagName("form")[0].onsubmit = function(e){
        e.preventDefault();
        var file = document.getElementsByName("picture")[0].files[0];
        var data = {username: document.getElementsByName("username")[0].value};
        var formdata = new FormData();
        formdata.append("picture", file);
        formdata.append("data", JSON.stringify(data));
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                    fetchProfile();
            }
        };
        xhr.open("POST", "/api/profile/", true);
        xhr.send(formdata);
    }
    
}())

