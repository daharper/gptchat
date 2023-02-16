class Settings {
    constructor(model = "text-davinci-003", temperature = 1, maxTokens = 600) {
        this.model = model;
        this.temperature = temperature;
        this.maxTokens = maxTokens;
        this.url = "https://api.openai.com/v1/completions";
        this.bearer = "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";
    }
}

export { Settings }