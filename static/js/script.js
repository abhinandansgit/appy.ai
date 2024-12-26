// Event listener for the Generate button
document.getElementById("generate-btn").addEventListener("click", function () {
    const userInput = document.getElementById("user-input").value;

    if (userInput.trim() === "") {
        alert("Please enter a prompt!");
        return;
    }


    
    const loadingAnimation = document.getElementById("loading-animation");
    const outputDiv = document.getElementById("output");
    const outputText = document.getElementById("output-text");
    const copyBtn = document.getElementById("copy-btn");
    const readBtn = document.getElementById("read-btn");

    // Stop any ongoing speech synthesis when new output is generated
    if (speechSynthesisInstance) {
        speechSynthesis.cancel();
        isSpeaking = false;
        readBtn.textContent = "Read out"; // Reset the button text
    }

    // Show the loading animation
    loadingAnimation.style.display = "block";
    outputText.innerHTML = ""; // Clear previous output
    outputDiv.style.display = "none"; // Hide the output box initially
    copyBtn.style.display = "none"; // Hide the Copy button initially
    readBtn.style.display = "none"; // Hide the Read button initially

    fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Parse and format response
            const responseData = data.response;
            const lines = responseData.split("\n");
            lines.forEach((line) => {
                if (/\*\*(.*?)\*\*/.test(line)) {
                    // Heading detection (**word**)
                    const headingText = line.match(/\*\*(.*?)\*\*/)[1];
                    const heading = document.createElement("h2");
                    heading.textContent = headingText;
                    heading.style.color = "#FF6347";
                    heading.style.fontSize = "1.5em";
                    heading.style.fontWeight = "bold";
                    outputText.appendChild(heading);
                } else if (/\*(.*?)\*/.test(line)) {
                    // Subheading detection (*word*)
                    const paragraphText = line.replace(/\*(.*?)\*/, "");
                    const subheadingText = line.match(/\*(.*?)\*/)[1];

                    const paragraph = document.createElement("p");
                    paragraph.textContent = paragraphText;

                    const subheading = document.createElement("span");
                    subheading.textContent = subheadingText;
                    subheading.style.fontStyle = "italic";
                    subheading.style.color = "#4A90E2";
subheading.style.fontSize = "1.2em";    subheading.style.fontWeight = "600";

                    paragraph.prepend(subheading);
                    outputText.appendChild(paragraph);
                } else {
                    // Normal paragraph
                    const paragraph = document.createElement("p");
                    paragraph.textContent = line;
                    outputText.appendChild(paragraph);
                }
            });

            // Hide the loading animation and display the output
            loadingAnimation.style.display = "none";
            outputDiv.style.display = "block";
            copyBtn.style.display = "inline-block"; // Show the Copy button
            readBtn.style.display = "inline-block"; // Show the Read button

            // Scroll to the output section
            outputDiv.scrollIntoView({ behavior: "smooth" });
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");

            // Hide the loading animation in case of an error
            loadingAnimation.style.display = "none";
        });
});

// Event listener for the Copy button
document.getElementById("copy-btn").addEventListener("click", function () {
    const outputText = document.getElementById("output-text");

    // Get the text content of the output
    const textToCopy = outputText.textContent || outputText.innerText;

    if (!textToCopy.trim()) {
        alert("No text available to copy!");
        return;
    }

    // Use the Clipboard API to copy the text
    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
            alert("Failed to copy text. Please try again.");
        });
});

// Speech synthesis logic
let isSpeaking = false; // Toggle state
let speechSynthesisInstance = null; // Store speech instance

document.getElementById("read-btn").addEventListener("click", function () {
    const outputText = document.getElementById("output-text");
    const textToRead = outputText.textContent || outputText.innerText;

    if (!textToRead.trim()) {
        alert("No text available to read!");
        return;
    }

    if (!isSpeaking) {
        // Start reading
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.voice = speechSynthesis
            .getVoices()
            .find((voice) => voice.name.includes("Female")); // Select a female voice
        utterance.rate = 1; // Adjust speed
        utterance.pitch = 1; // Adjust pitch

        speechSynthesis.speak(utterance);
        speechSynthesisInstance = utterance;
        isSpeaking = true;
        this.textContent = "Stop audio"; // Change button text
    } else {
        // Pause or stop reading
        speechSynthesis.cancel();
        isSpeaking = false;
        this.textContent = "Read out"; // Revert button text
    }
});

// Add functionality for feature buttons
const featureButtons = {
    "lamborghini-btn": "/lamborghini",
    "story-btn": "/story",
    "joke-btn": "/joke",
    "quote-btn": "/quote",
    "fact-btn": "/fact",
};

Object.keys(featureButtons).forEach((buttonId) => {
    document.getElementById(buttonId)?.addEventListener("click", function () {
        const loadingAnimation = document.getElementById("loading-animation");
        const outputDiv = document.getElementById("output");
        const outputText = document.getElementById("output-text");
        const copyBtn = document.getElementById("copy-btn");
        const readBtn = document.getElementById("read-btn");

        // Stop any ongoing speech synthesis when new output is generated
        if (speechSynthesisInstance) {
            speechSynthesis.cancel();
            isSpeaking = false;
            readBtn.textContent = "Read Aloud"; // Reset the button text
        }

        // Show the loading animation
        loadingAnimation.style.display = "block";
        outputText.innerHTML = ""; // Clear previous output
        outputDiv.style.display = "none";
        copyBtn.style.display = "none";
        readBtn.style.display = "none";

        fetch(featureButtons[buttonId])
            .then((response) => response.json())
            .then((data) => {
                const responseData = data.response;
                const lines = responseData.split("\n");

                lines.forEach((line) => {
                    if (/\*\*(.*?)\*\*/.test(line)) {
                        const headingText = line.match(/\*\*(.*?)\*\*/)[1];
                        const heading = document.createElement("h2");
                        heading.textContent = headingText;
                        heading.style.color = "#FF6347";
                        heading.style.fontSize = "1.5em";
                        heading.style.fontWeight = "bold";
                        outputText.appendChild(heading);
                    } else if (/\*(.*?)\*/.test(line)) {
                        const paragraphText = line.replace(/\*(.*?)\*/, "");
                        const subheadingText = line.match(/\*(.*?)\*/)[1];

                        const paragraph = document.createElement("p");
                        paragraph.textContent = paragraphText;

                        const subheading = document.createElement("span");
                        subheading.textContent = subheadingText;
                        subheading.style.fontStyle = "italic";
                        subheading.style.color = "#4A90E2";
                        subheading.style.fontWeight = "600";

                        paragraph.prepend(subheading);
                        outputText.appendChild(paragraph);
                    } else {
                        const paragraph = document.createElement("p");
                        paragraph.textContent = line;
                        outputText.appendChild(paragraph);
                    }
                });

                // Display the output and buttons
                loadingAnimation.style.display = "none";
                outputDiv.style.display = "block";
                copyBtn.style.display = "inline-block";
                readBtn.style.display = "inline-block";

                outputDiv.scrollIntoView({ behavior: "smooth" });
            })
            .catch((error) => {
                console.error("Error:", error);
                loadingAnimation.style.display = "none";
            });
    });
});
