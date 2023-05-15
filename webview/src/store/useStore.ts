import { create } from "zustand";
import { persist } from "zustand/middleware"

export type Prompt = {
    key: string;
    content: string;
}

export type Response = {
    markdownPreTagLang: string;
    content: string;
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
