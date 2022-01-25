---
layout: default
permalink: /lectures/03/review/
---

- What is HTTP?
- What are the different components that compose URL? Which ones are optional?
- What are the different components that compose an HTTP request? Which ones are optional?
- What are the different components that compose an HTTP response? Which ones are optional?
- What are the main HTTP request methods? What are they used for?
- What is a safe method? What is a idempotent method?
- What are the 5 HTTP response status code families? What are they used for?

- What is Ajax? Why is it "asynchronous" exactly? 
- What is JSON? 
- Considering the code below, explain:
    
    1. what the developer wants to achieve with this code
    1. how it is executed by browser
    1. why it might not work as intended

    ```
    var result = ""
    result = this.responseText;
    xhr.onreadystatechange = function (){
         if (this.readyState === 200)
             result = this.responseText;
         }     
    }
    xhr.open(GET, /message/, true);
    xhr.send(body);
    document.getElementById.innerHTML = result;
    ```

- What is a RESTful API?
- What are the main design principles behind REST?