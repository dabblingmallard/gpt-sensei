import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';

export function createOpenAiApi(apiKey: string): OpenAIApi {
    const configuration = new Configuration({
        apiKey,
    });

    return new OpenAIApi(configuration);
}

export async function getCompletion(
    openai: OpenAIApi,
    messages: { role: ChatCompletionRequestMessageRoleEnum; content: string }[],
): Promise<string | undefined> {
    if (!messages.length) {
        return;
    }

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
    });

    return completion.data.choices[0].message?.content;
}