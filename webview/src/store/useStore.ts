import { create } from "zustand";
import { persist } from "zustand/middleware"

export type Prompt = {
    key: string;
    content: string;
}

export type Response = {
    content: string;
    language?: string;
    system?: string;
    prompt?: string;
}

type AppStore = {
    prompts: Prompt[];
    promptInput: string;
    systemInput: string;
    responses: Response[];
}

export const useStore = create(
    persist<AppStore>(
        () => ({
            prompts: [],
            promptInput: '',
            systemInput: '',
            responses: []
        }),
        {
            name: 'gpt-sensei'
        }
    )
);
export const onSubmitRequest = (systemInput: string, promptInput: string) => {
    window.vscode.postMessage({
        command: 'submit',
        systemContent: systemInput,
        promptContent: promptInput
    });
}

export const openCustomVscodeEditor = (content: string, language?: string) => {
    window.vscode.postMessage({
        command: 'openResponseInEditor',
        content,
        language
    })
}

export const deleteResponse = (index: number) => {
    useStore.setState(state => {
        const newResponses = [...state.responses];
        newResponses.splice(index, 1);

        return {
            responses: newResponses
        }
    })
};