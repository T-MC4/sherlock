import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';

export class OpenAI {
    private openai: OpenAIApi;

    constructor(apiKey: string) {
        // Create the Configuration and OpenAIApi instances
        let configuration = new Configuration({
            apiKey 
        })
        delete configuration.baseOptions.headers['User-Agent'];
        this.openai = new OpenAIApi(configuration);
    }

    // Asynchronous function to generate text from the OpenAI API
    async generateText(
        prompt: string,
        model: string,
        max_tokens: number,
        temperature = 0.85
    ): Promise<string | undefined> {
        try {
            // Create a request object
            const request: CreateCompletionRequest = {
                model,
                prompt,
                max_tokens,
                n: 1,
                temperature,
            };

            // Send a request to the OpenAI API to generate text
            const response = await this.openai.createCompletion(request);

            // Return the text of the response
            return response.data.choices[0].text;
        } catch (error) {
            throw error;
        }
    }
}
