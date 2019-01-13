(function(){
    "use strict";

    //http://stiltsoft.com/blog/2013/05/google-chrome-how-to-use-the-web-speech-api/

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-us";

    var record_on = function(){
      document.getElementById('speech2text').innerHTML = "stop";
      document.getElementById('speech2text').onclick = record_off;
      recognition.start();
    };

    var record_off = function(){
      recognition.stop();
      document.getElementById('speech2text').onclick = record_on;
      document.getElementById('speech2text').innerHTML = "Write it!";
    };

    recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            document.getElementById('textarea').value = event.results[i][0].transcript;
        }
    };

    // https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API?hl=en

    var sayit = function(){
        var msg = new SpeechSynthesisUtterance();
        msg.text = document.getElementById('textarea').value;
        msg.lang = 'en-us';
        speechSynthesis.speak(msg);
    };
    
    window.addEventListener('load', function(){
        document.getElementById('speech2text').onclick = record_on;
        document.getElementById('text2speech').onclick = sayit;
    });
    
})();






