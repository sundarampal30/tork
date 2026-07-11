 let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

/* ---------- SPEAK FUNCTION ---------- */
function speak(text) {
    window.speechSynthesis.cancel(); // old voice stop
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.9;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
}

/* ---------- WISH FUNCTION ---------- */
function wishme() {
    let hours = new Date().getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good evening sir");
    }
}

window.addEventListener("load", () => {
    wishme();
});

/* ---------- SPEECH RECOGNITION ---------- */
let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition");
}

let recognition = new SpeechRecognition();
recognition.lang = "en-IN";  // best for India
recognition.continuous = false;
recognition.interimResults = false;

/* ---------- RESULT ---------- */
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

/* ---------- BUTTON CLICK ---------- */
btn.addEventListener("click", () => {
    recognition.stop(); // avoid already started error
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

/* ---------- COMMAND HANDLER ---------- */
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hi")) {
        speak("Hello sir, what can I help you?");
    }

    else if (message.includes("who are you")) {
        speak("I am Alexa, a virtual assistant");
    }

    else if (message.includes("who created you")) {
        speak("Mister Sundaram");
    }

    else if (message.includes("how are you")) {
        speak("I am always good sir");
    }

    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    }

    else if (message.includes("my friend name")) {
        speak("Arpit Indrajeet");
    }

    else if (message.includes("tell me about myself")) {
        speak("You are Mister Sundaram Pal");
        speak("Age eighteen");
        speak("Date of birth thirty July two thousand seven");
        speak("Height five point eight feet");
    }

    else if (message.includes("play my favourite bhojpuri song")) {
        speak("Playing your favourite Bhojpuri song");
        window.open("https://youtu.be/c4JD7rEtIj8");
    }

    else if (message.includes("play arijit singh song")) {
        speak("Playing Arijit Singh song");
        window.open("https://youtu.be/pIBoAh4OXhQ");
    }

    else if (message.includes("play my favourite song")) {
        speak("Playing your favourite song");
        window.open("https://youtu.be/tKLcFy1HDUA");
    }

    else if (message.includes("play motivational song")) {
        speak("Playing motivational song");
        window.open("https://youtu.be/JYxLB_JMmug");
    }

    else if (message.includes("show me moon")) {
        speak("Here is the moon");
        window.open("./img/moon.jpg"); // correct path
    }

    else {
        speak("Sorry sir, i can't understand .");
    }
}
