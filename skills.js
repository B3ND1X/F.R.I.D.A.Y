// skills.js - Contains additional useful skills

// Initialize the speech recognition (SST) instance
let recognition;

// Check if the browser supports speech recognition
function initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition is not supported by this browser.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;  // Continuous listening
    recognition.interimResults = false; // Do not return partial results
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        console.log("Speech recognition started.");
    };

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcript = transcript.trim().toLowerCase();
        console.log("Transcript:", transcript);
        
        // Call the appropriate function based on the command detected
        handleCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
        console.log("Speech recognition ended.");
    };

    // Start recognition
    recognition.start();
}

// Handle the command based on the voice input
function handleCommand(command) {
    if (command.includes("what time is it")) {
        const currentTime = getCurrentTime();
        speakText(currentTime);
    } else if (command.includes("tell me a joke")) {
        tellAJoke();
    } else if (command.includes("give me a compliment")) {
        giveCompliment();
    } else if (command.includes("tell me a fun fact")) {
        tellAFunFact();
    } else if (command.includes("give me motivation")) {
        giveMotivation();
    } else if (command.includes("tell me a random fact")) {
        tellARandomFact();
    } else {
        speakText("Sorry, I didn't understand that command.");
    }
}

// Get the current time as a human-readable string
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return `The current time is ${formattedTime}.`;
}

// Get a random joke from an array of jokes
function getRandomJoke() {
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What do you get if you cross a snowman and a vampire? Frostbite!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Tell a random joke
function tellAJoke() {
    const joke = getRandomJoke();
    speakText(joke);  // Use TTS to speak the joke
}

// Give a random compliment
function giveCompliment() {
    const compliments = [
        "You're doing an amazing job!",
        "You have a great sense of humor!",
        "You're looking fantastic today!",
        "You're an awesome person!"
    ];
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    speakText(compliment);  // Use TTS to speak the compliment
}

// Share a fun fact
function tellAFunFact() {
    const facts = [
        "Did you know honey never spoils? Archaeologists have found pots of honey in ancient tombs that are over 3,000 years old!",
        "A group of flamingos is called a 'flamboyance'.",
        "Bananas are berries, but strawberries aren't.",
        "There are more stars in the universe than grains of sand on all the Earth's beaches."
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    speakText(fact);  // Use TTS to speak the fun fact
}

// Give a random motivational quote
function giveMotivation() {
    const quotes = [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Believe you can and you're halfway there. – Theodore Roosevelt",
        "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
        "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb"
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    speakText(quote);  // Use TTS to speak the quote
}

// Share a random fact
function tellARandomFact() {
    const randomFacts = [
        "Octopuses have three hearts and blue blood.",
        "A day on Venus is longer than a year on Venus.",
        "Sharks have been around longer than trees.",
        "Sloths can hold their breath longer than dolphins."
    ];
    const fact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
    speakText(fact);  // Use TTS to speak the random fact
}

// Use Text-to-Speech to speak the given text
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        console.log("TTS is not supported by this browser.");
    }
}
