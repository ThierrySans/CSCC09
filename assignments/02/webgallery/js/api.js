var api = (function(){
    var module = {};
    
    /*  ******* Data types *******
        image objects must have at least the following attributes:
            - (String) _id 
            - (String) title
            - (String) author
            - (String) url
            - (Date) date
    
        comment objects must have the following attributes
            - (String) _id
            - (String) imageId
            - (String) author
            - (String) content
            - (Date) date
    
    ****************************** */ 
    
    // add an image to the gallery
    module.addImage = function(title, author, file, callback){
        
    }
    
    // delete an image from the gallery given its imageId
    module.deleteImage = function(imageId, callback){
        
    }
    
    // get an image from the gallery given its imageId
    module.getImage = function(imageId, callback){
        
    }
    
    // get all imageIds from the gallery
    module.getAllImageIds = function(callback){

    }
    
    // add a comment to an image
    module.addComment = function(imageId, author, content, callback){
        
    }
    
    // delete a comment to an image
    module.deleteComment = function(commentId, callback){
        
    }
    
    // get 10 latest comments given an offset 
    module.getComments = function(imageId, offset, callback){
        
    }
    
    return module;
})();