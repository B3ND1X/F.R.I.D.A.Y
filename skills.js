// skill.js - Contains additional useful skills

// Speak the current time
function getCurrentTime(query) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    speakText(`The current time is ${formattedTime}.`);
}

// Tell a random joke
function getRandomJoke(query) {
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What do you get if you cross a snowman and a vampire? Frostbite!"
    ];
    speakText(jokes[Math.floor(Math.random() * jokes.length)]);
}

// Convert units like miles to kilometers
function convertUnits(query) {
    const milesToKm = 1.60934;
    const match = query.match(/(\d+)\s*miles/);
    if (match) {
        const miles = parseFloat(match[1]);
        const km = miles * milesToKm;
        speakText(`${miles} miles is equal to ${km.toFixed(2)} kilometers.`);
    } else {
        speakText("Please specify the unit you want to convert.");
    }
}

// Perform simple math operations
function doMath(query) {
    const regex = /(\d+)\s*([+\-*/])\s*(\d+)/;
    const match = query.match(regex);
    if (match) {
        const num1 = parseFloat(match[1]);
        const operator = match[2];
        const num2 = parseFloat(match[3]);
        let result;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            default:
                result = "I couldn't understand the math operation.";
        }

        speakText(`The result is ${result}`);
    } else {
        speakText("I couldn't find a math expression in your query.");
    }
}

// Set a timer
function setTimer(query) {
    const match = query.match(/(\d+)\s*(minutes|seconds)/);
    if (match) {
        const time = parseInt(match[1]);
        const unit = match[2];

        let timeInMillis = unit === 'minutes' ? time * 60000 : time * 1000;

        speakText(`Setting a timer for ${time} ${unit}.`);

        setTimeout(() => {
            speakText(`The ${unit} timer has finished.`);
        }, timeInMillis);
    } else {
        speakText("Please specify the time for the timer, such as '10 minutes'.");
    }
}

// Set an alarm
function setAlarm(query) {
    const match = query.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const ampm = match[3].toUpperCase();

        const alarmTime = new Date();
        alarmTime.setHours(ampm === "PM" ? hours + 12 : hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);

        const timeUntilAlarm = alarmTime - new Date();

        speakText(`Setting an alarm for ${hours}:${minutes} ${ampm}.`);

        setTimeout(() => {
            speakText("It's time! Your alarm is ringing.");
        }, timeUntilAlarm);
    } else {
        speakText("Please provide a valid time for the alarm, such as '7:30 PM'.");
    }
}

// Search for something on the web
function searchWeb(query) {
    const searchQuery = query.replace("search for", "").trim();
    if (searchQuery) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        speakText(`Searching for ${searchQuery}.`);
        window.open(url, '_blank');
    } else {
        speakText("Please provide a query to search for.");
    }
}

// Fetch and speak the current weather
function getWeather(query) {
    const weatherApiKey = "80445369031848dbad520436251201"; // Replace with your API key
    const city = query.replace("weather in", "").trim();
    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.weather && data.main) {
                const description = data.weather[0].description;
                const temperature = data.main.temp;
                speakText(`The weather in ${city} is ${description} with a temperature of ${temperature}°C.`);
            } else {
                speakText("Sorry, I couldn't get the weather for that location.");
            }
        })
        .catch(error => speakText("Error fetching weather data."));
}

// Get a random motivational quote
function getMotivation(query) {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "Believe you can and you're halfway there. - Theodore Roosevelt"
    ];
    speakText(quotes[Math.floor(Math.random() * quotes.length)]);
}

// Get latest news (requires API key)
function getLatestNews(query) {
    const guardianApiKey = "962cca3b-893a-4285-969b-51e44bf81615"; // Replace with your API key
    const url = `https://content.guardianapis.com/search?api-key=${guardianApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.response.results;
            let newsText = '';
            articles.forEach((article, index) => {
                if (index < 3) {
                    newsText += `${article.webTitle} - ${article.webUrl}\n`;
                }
            });
            speakText(newsText || "No news available.");
        })
        .catch(error => speakText("Error fetching news data."));
}

// Translate text to a different language
function translateText(query) {
    const match = query.match(/translate "(.*?)" to (.*)/i);
    if (match) {
        const textToTranslate = match[1];
        const targetLanguage = match[2];
        
        const translateApiKey = "your_translate_api_key"; // Replace with your API key
        const url = `https://translation.googleapis.com/language/translate/v2?key=${translateApiKey}`;
        
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                q: textToTranslate,
                target: targetLanguage
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.translations) {
                speakText(`The translation of "${textToTranslate}" to ${targetLanguage} is: ${data.data.translations[0].translatedText}`);
            } else {
                speakText("Sorry, I couldn't translate that text.");
            }
        })
        .catch(error => speakText("Error translating text."));
}

// Simple stopwatch
function startStopwatch(query) {
    let startTime = Date.now();
    speakText("Stopwatch started.");

    const stopwatchInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        speakText(`Time: ${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`);
    }, 1000);

    setTimeout(() => {
        clearInterval(stopwatchInterval);
        speakText("Stopwatch stopped.");
    }, 60000); // Stop after 1 minute
}

// Unit converter
function convertCurrency(query) {
    const match = query.match(/(\d+)\s*(usd|eur|gbp)/i);
    if (match) {
        const amount = parseFloat(match[1]);
        const currency = match[2].toLowerCase();
        
        // Placeholder conversion logic (replace with API calls as needed)
        let convertedAmount = amount * 1.2; // Example: convert USD to EUR
        
        speakText(`${amount} ${currency.toUpperCase()} is approximately ${convertedAmount.toFixed(2)} EUR.`);
    } else {
        speakText("Please specify the amount and currency to convert.");
    }
}

// Open a website
function openWebsite(query) {
    const match = query.match(/open (.*?)$/);
    if (match) {
        const website = match[1];
        const url = `https://${website}.com`;
        speakText(`Opening ${website}.`);
        window.open(url, "_blank");
    } else {
        speakText("Please specify the website you want to open.");
    }
}

// Function to speak text using TTS
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        console.log("TTS is not supported by this browser.");
    }
}
