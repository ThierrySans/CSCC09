var test = function(files){
    
  var user = {username:'test', password: 'test'};
    
  before(function(done){
      model.signUp(user,done);
  });   
    
  before(function(done){
      model.signIn(user,done);
  });
  
  describe('Creating a message', function() {
    
    var data = {username: 'me', content:'Hello World!'};
    var message;
    
    before(function(done){
        model.createMessage(data, function(err, result){
            if (err) return done(err);
            message = result;
            done();
        });
    });
    
    it('should have the same username', function(){
        assert.equal(message.username, data.username);
    });
    
    it('should have the same content', function(){
        assert.equal(message.content, data.content);
    });
    
    it('should have an _id', function(){
        assert.isDefined(message._id);
    });
    
    it('should have an upvote', function(){
        assert.isDefined(message.upvote);
    });
    
    it('should have an downvote', function(){
        assert.isDefined(message.upvote);
    });

 });
 
 describe('Update a user profile', function() {
   
    var data = {picture: files[0]};
    var mimetype;
    
   before(function(done){
       model.updateUser(data,done);
   });
   
   
   before(function(done){
       fetch('/api/users/' + user.username + "/picture/")
       .then(function(response){
           mimetype = response.headers.get("content-type");
           done();
       });
   });
   
   // it('should be the same picture', function(){
   //     // I don't know how to compare that
   // });
   
   it('should have the same mimetype', function(){
      assert.equal(data.picture.type, mimetype);
   });

});
}


