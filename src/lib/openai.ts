import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatWithMemory = async (messages) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });
    return response.data.choices[0].message.content;
};

export const summarizeContent = async (text) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Summarize the following content: ${text}` }],
    });
    return response.data.choices[0].message.content;
};

export const generateQuiz = async (topic) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Generate a quiz about ${topic}` }],
    });
    return response.data.choices[0].message.content;
};