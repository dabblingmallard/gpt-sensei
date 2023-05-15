import { create } from "zustand";
import { persist } from "zustand/middleware"
import { LanguageId } from "../components/LanguageSelect";

export type Prompt = {
    key: string;
    content: string;
}

export type Response = {
    content: string;
    language?: LanguageId;
    system?: string;
    prompt?: string;
}

export type AppStore = {
    replace: boolean;
    autoInput: boolean;
    prompts: Prompt[];
    promptInput: string;
    systemInput: string;
    responses: Response[];
}

export const useStore = create(
    persist<AppStore>(
        () => ({
            replace: true,
            autoInput: true,
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

export const setAutoSystemInput = (autoSystemInput: boolean) => {
    useStore.setState({ autoInput: autoSystemInput })
    window.vscode.postMessage({
        command: 'setAutoSystemInput',
        autoSystemInput
    });
}

export const onSubmitRequest = (systemInput: string, promptInput: string, replace?: boolean) => {
    window.vscode.postMessage({
        command: 'submit',
        systemContent: systemInput,
        promptContent: promptInput,
        replace,
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