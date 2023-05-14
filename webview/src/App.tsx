import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResponseContainer } from './components/ResponseContainer';
import { systemMessage } from './utils/prompts';

const App = () => {
    const [systemInput, setSystemInput] = useState('');
    const [promptInput, setPromptInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');

    useEffect(() => {
        window.addEventListener('message', (event) => {
            const message = event.data;

            if (message.command === 'showResponse') {
                setIsLoading(false)
                setResponse(message.content)
            }

            if (message.command === 'updateSystemInput') {
                setSystemInput(systemMessage(message))
            }
        });
    }, [])

    const handleSubmit = async () => {
        setIsLoading(true);

        window.vscode.postMessage({
            command: 'submit',
            systemContent: systemInput,
            promptContent: promptInput
        });
    };

    return (
        <div className="bg-gray-900 text-white h-full w-full p-5" style={{ height: '100vh', width: '100vw' }}>
            <InputForm
                systemInput={systemInput}
                onSystemInputChange={setSystemInput}
                promptInput={promptInput}
                onPromptInputChange={setPromptInput}
                onSubmit={handleSubmit}
            />
            {isLoading ? <LoadingIndicator /> : <ResponseContainer response={response} />}
        </div >
    );
};

export default App;

