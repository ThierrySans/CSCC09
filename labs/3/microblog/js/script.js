document.getElementById("create_message_form").onsubmit = function(e){
    // prevent from refreshing the page on submit
    e.preventDefault();
    // read form elements
    username = document.getElementById("create_message_name").value;
    content = document.getElementById("create_message_content").value;
    // clean form 
    document.getElementById("create_message_form").reset();
    // create a new message element
    e = document.createElement('div');
    e.className = "message";
    e.innerHTML = `
            <div class="message_header">
                <div class="message_avatar"><img src="media/user.png" alt="${username}"/></div>
                <div class="message_name">${username}</div>
            </div>
            <div class="message_content">${content}</div>
            <div class="message_vote">
                <div class="down_button vote_button">0</div>
                <div class="up_button vote_button">0</div>
            </div>`;
    // add this element to the document
    document.getElementById("messages").prepend(e);
}