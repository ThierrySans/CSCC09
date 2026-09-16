// SpeechRecognition only works on Chrome (but not Brave)

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-us";

function record_on() {
  document.getElementById("speech2text").innerHTML = "stop";
  document.getElementById("speech2text").onclick = record_off;
  recognition.start();
}

function record_off() {
  recognition.stop();
  document.getElementById("speech2text").onclick = record_on;
  document.getElementById("speech2text").innerHTML = "Write it!";
}

recognition.onerror = function (event) {
  console.log(event.error);
};

recognition.onresult = function (event) {
  console.log(event);
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    document.getElementById("textarea").value = event.results[i][0].transcript;
  }
};

function say_it() {
  let msg = new SpeechSynthesisUtterance();
  msg.text = document.getElementById("textarea").value;
  msg.lang = "en-us";
  speechSynthesis.speak(msg);
}

document.getElementById("speech2text").onclick = record_on;
document.getElementById("text2speech").onclick = say_it;
