async function submitJournal() {
    let journalEntry = document.getElementById("journalEntry").value;
    if (journalEntry.trim() === "") {
        alert("Enter something first, mate.");
        return;
    }
g
    document.getElementById("aiResponse").innerHTML = "Analyzing...";

    let apiKey = "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";  // Replace with your Groq API key

    let prompt = `
    You are Ghost from Call of Duty, special force operative in UK. You are giving brutally honest and tactical feedback on a soldier's personal journal.
    Be direct, sarcastic, and push the user to be stronger. May use swear words.

    Journal Entry:
    "${journalEntry}"

    Give a critical response:
    `;

    let response = await fetch("https://api.groq.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "llama3-70b-8192",  // Adjust the model as needed
            messages: [
                { role: "system", content: "You are Ghost from Call of Duty, a tactical and brutally honest AI." },
                { role: "user", content: prompt }
            ],
            max_tokens: 200
        })
    });

    let data = await response.json();
    document.getElementById("aiResponse").innerText = data.choices[0].message.content;
}