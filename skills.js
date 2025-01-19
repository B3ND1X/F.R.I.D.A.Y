// skill.js - Contains additional useful skills

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
