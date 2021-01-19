(function(){
    "use strict";
    
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-us";
    
    let record_on = function(){
      document.getElementById('speech2text').innerHTML = "stop";
      document.getElementById('speech2text').onclick = record_off;
      recognition.start();
    };
    
    let record_off = function(){
      recognition.stop();
      document.getElementById('speech2text').onclick = record_on;
      document.getElementById('speech2text').innerHTML = "Write it!";
    };

    recognition.onerror = function(event) {
        console.log(event.error);
    };

    recognition.onresult = function (event) {
        console.log(event);
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            document.getElementById('textarea').value = event.results[i][0].transcript;
        }
    };
        
    let say_it = function(){
        let msg = new SpeechSynthesisUtterance();
        msg.text = document.getElementById('textarea').value;
        msg.lang = 'en-us';
        speechSynthesis.speak(msg);
    };
    
    window.addEventListener('load', function(){
        document.getElementById('speech2text').onclick = record_on;
        document.getElementById('text2speech').onclick = say_it;
    });
    
})();






