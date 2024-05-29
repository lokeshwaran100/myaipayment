import { Configuration, OpenAIApi } from 'openai'


export const createOpenAiInstance = (key) => {
    const configuration = new Configuration({
        apiKey: key,
    });

    return new OpenAIApi(configuration);
};
