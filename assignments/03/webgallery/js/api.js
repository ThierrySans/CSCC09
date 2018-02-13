var api = (function(){
    var module = {};
    
    /*  ******* Data types *******
        image objects must have at least the following attributes:
            - (String) _id 
            - (String) title
            - (String) author
            - (Date) date
    
        comment objects must have the following attributes
            - (String) _id
            - (String) imageId
            - (String) author
            - (String) content
            - (Date) date
    
    ****************************** */ 
    
    module.signup = function(username, password, callback){
        
    }
    
    module.signin = function(username, password, callback){
        
    }
    
    // get all usernames (no pagination)
    module.getUsernames = function(callback){
        
    }
    
    // add an image to the gallery
    module.addImage = function(title, file, callback){
        
    }
    
    // delete an image from the gallery given its imageId
    module.deleteImage = function(imageId, callback){
        
    }
    
    // get an image from the gallery given its imageId
    module.getImage = function(imageId, callback){
        
    }
    
    // get all imageIds for a given username's gallery (no pagination)
    module.getAllImageIds = function(username, callback){

    }
    
    // add a comment to an image
    module.addComment = function(imageId, content, callback){
        
    }
    
    // delete a comment to an image
    module.deleteComment = function(commentId, callback){
        
    }
    
    // get comments (with pagination)
    module.getComments = function(imageId, page, callback){
        
    }
    
    return module;
})();