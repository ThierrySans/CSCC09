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
		var imageType = /image.*/;
		if (file.type.match(imageType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
                updateProfile(reader.result, "PREVIEW");
			};
			reader.readAsDataURL(file);	
		}
    }
        
    window.onload = function(e){
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
    
}())

