const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");

let model = "text-davinci-003";
let temperature = 1;
let maxTokens = 600;

let url = "https://api.openai.com/v1/completions";
let bearer = "your api key";

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

    req.open("post", url, false);

    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + bearer);

    let body = `{"model": "${model}", "prompt": "${question}", "temperature": ${temperature}, "max_tokens": ${maxTokens}}`;
    req.send(body);

    if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        return data.choices[0].text.trim();
    }

    return "error: " + req.responseText.trim();
}
