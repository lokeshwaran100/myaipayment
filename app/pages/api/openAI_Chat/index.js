import { createOpenAiInstance } from "../openAI_predictions/createOpenAiInstance";
import OpenAI from "openai";
const paidKey = process.env.PAID_OPENAI_API_KEY;
const freeKey = process.env.OPENAI_API_KEY;

const maxTokens = 3000;

export default async function handler(req, res) {

    try {

        const { message, version } = req.body;
        let response;

        if (version == 'free') {
            const openai = createOpenAiInstance(freeKey);
            response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo-1106",
                messages: message,
                max_tokens: maxTokens,
                temperature: 0,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            });
        }
        if (version == 'paid') {
            const openai = createOpenAiInstance(paidKey);
            response = await openai.createChatCompletion({
                model: "gpt-4",
                messages: message,
                max_tokens: maxTokens,
                temperature: 0,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            });
        }
        console.log(response.data.choices[0].message)
        if (response.data.choices[0].message.content) {
            res.send(JSON.stringify({
                message: response.data.choices[0].message.content
            }));
        }

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong"+error.message,
        });
    }
};
