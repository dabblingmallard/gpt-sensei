import React from 'react';

type InputFormProps = {
    systemInput: string;
    onSystemInputChange: (value: string) => void;
    promptInput: string;
    onPromptInputChange: (value: string) => void;
    onSubmit: () => void;
};

export const InputForm: React.FC<InputFormProps> = ({
    systemInput,
    onSystemInputChange,
    promptInput,
    onPromptInputChange,
    onSubmit
}) => (
    <div>
        <label htmlFor="systemInput" className="block text-sm font-medium text-gray-300">
            System
        </label>
        <textarea
            id="systemInput"
            value={systemInput}
            onChange={(e) => onSystemInputChange(e.target.value)}
            rows={5}
            className="p-2 resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-800 text-white"
        ></textarea>

        <label htmlFor="promptInput" className="block mt-4 text-sm font-medium text-gray-300">
            Prompt
        </label>
        <textarea
            id="promptInput"
            value={promptInput}
            onChange={(e) => onPromptInputChange(e.target.value)}
            rows={5}
            className="p-2 resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1 bg-gray-800 text-white"
        ></textarea>

        <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Submit
        </button>
    </div>
);