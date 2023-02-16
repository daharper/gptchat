import { Settings }  from "./scripts/settings.js";

const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");

let settings = new Settings();

function addResult(inputAsString, output) {
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");

    inputLogElement.textContent = `> ${inputAsString}`;
    outputLogElement.innerHTML = output;

    historyContainer.append(inputLogElement, outputLogElement);
}

consoleInput.addEventListener("keyup", e => {
    const question = consoleInput.value.trim();

    if (question.length === 0) return;
    if (e.key !== "Enter") return;

    try {
        let answer = execute(question);
        addResult(question, answer);
    } catch (err) {
        addResult(question, err);
    }

    consoleInput.value = "";
    historyContainer.scrollTop = historyContainer.scrollHeight;
});

function execute(question) {
    let req = new XMLHttpRequest();

    req.open("post", settings.url, false);

    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + settings.bearer);

    let body = `{"model": "${settings.model}", "prompt": "${question}", "temperature": ${settings.temperature}, "max_tokens": ${settings.maxTokens}}`;
    req.send(body);

    if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        return data.choices[0].text.trim();
    }

    return "error: " + req.statusText;
}
