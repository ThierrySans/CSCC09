var api = (function(){
    var module = {};
    
    /*  ******* Data types *******
        image objects must have at least the following attributes:
            - (String) imageId 
            - (String) title
            - (String) url
            - (Date) date
    
        comment objects must have the following attributes
            - (String) commentId
            - (String) imageId
            - (String) author
            - (String) content
            - (Date) date
    
    ****************************** */ 
    
    // add an image to the gallery
    // return an image object
    module.addImage = function(title, author, url){
        
    }
    
    // delete an image from the gallery given its imageId
    // return an image object
    module.deleteImage = function(imageId){
        
    }
    
    // get an image from the gallery given its imageId
    // return an image object
    module.getImage = function(imageId){
        
    }
    
    // get all imageIds from the gallery
    // return an array of (String) imageId
    module.getAllImageIds = function(){

    }
    
    // add a comment to an image
    // return a comment object
    module.addComment = function(imageId, author, content){
        
    }
    
    // delete a comment to an image
    // return a comment object
    module.deleteComment = function(commentId){
        
    }
    
    // get 10 latest comments given an offset 
    // return an array of comment objects
    module.getComments = function(imageId, offset=0){
        
    }
    
    return module;
})();