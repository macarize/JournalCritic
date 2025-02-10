async function submitJournal() {
    let journalEntry = document.getElementById("journalEntry").value.trim();
    let responseBox = document.getElementById("aiResponse");

    if (journalEntry === "") {
        alert("Enter something first, mate.");
        return;
    }

    responseBox.innerHTML = "Analyzing...";  // Show loading message

    let apiKey = "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";  // Replace with your actual Groq API key

    let prompt = `
    You are Ghost from Call of Duty, giving brutally honest and tactical feedback on a soldier's personal journal.
    Be direct, sarcastic, and push the user to be stronger.

    Journal Entry:
    "${journalEntry}"

    Give a critical response:
    `;

    try {
        let response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",  // Adjust model if needed
                messages: [
                    { role: "system", content: "You are Ghost from Call of Duty, a tactical and brutally honest AI." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        responseBox.innerText = data.choices[0].message.content;

    } catch (error) {
        console.error("Error fetching AI response:", error);
        responseBox.innerHTML = "⚠️ Error: Could not get AI response.";
    }
}
