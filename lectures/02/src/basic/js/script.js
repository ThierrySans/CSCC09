window.onload = function(){
    document.write("<h1 id='title'>This is a heading</h1>");
    
    document.getElementById("title").onclick = function(){
        document.write("<p>This is a paragraph.</p>");
    };
};