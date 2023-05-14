import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResponseContainer } from './components/ResponseContainer';

const App = () => {
    const [input, setInput] = useState({ systemInput: '', promptInput: '' });
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
                setInput({ ...input, systemInput: message.systemMessage })
            }
        });
    }, [])

    const handleSubmit = async () => {
        setIsLoading(true);

        window.vscode.postMessage({
            command: 'submit',
            systemContent: input.systemInput,
            promptContent: input.promptInput
        });
    };

    return (
        <div className="bg-gray-900 text-white h-full w-full p-5" style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <InputForm
                label="System input"
                value={input.systemInput}
                onChange={(newValue: string) => setInput({ ...input, systemInput: newValue })}
            />
            <InputForm
                label="Prompt input"
                value={input.promptInput}
                onChange={(newValue: string) => setInput({ ...input, promptInput: newValue })}
            />
            <div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    {isLoading ? <LoadingIndicator /> : 'Submit'}
                </button>
                <ResponseContainer response={response} />
            </div>
        </div >
    );
};

export default App;