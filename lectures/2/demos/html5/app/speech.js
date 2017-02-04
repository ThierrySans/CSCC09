$(document).ready(function(){
    $('#speech2text').attr("onclick","record_on()");
    $('#text2speech').attr("onclick","sayit()");
});

//http://stiltsoft.com/blog/2013/05/google-chrome-how-to-use-the-web-speech-api/

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-us";

var record_on = function(){
  $('#speech2text').html("stop!");
  $('#speech2text').attr("onclick","record_off()");
  recognition.start();
};

var record_off = function(){
  recognition.stop();
  $('#speech2text').attr("onclick","record_on()");
  $('#speech2text').html("Write it!");
};

recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
                $('#textarea').val(event.results[i][0].transcript);
        }
};

// https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API?hl=en

var sayit = function(){
    var msg = new SpeechSynthesisUtterance();
    msg.text = $('#textarea').val();
    msg.lang = 'en-us';
    speechSynthesis.speak(msg);
};





