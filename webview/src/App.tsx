import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResponseContainer } from './components/ResponseContainer';
import { onSubmitRequest, useStore } from './store/useStore';
import { IoMdSettings } from 'react-icons/io'
import { RadioSwitch } from './components/RadioSwitch';

if (!window.vscode) {
    window.vscode = {
        postMessage: (message: any) => {
            const event = new MessageEvent<{ command: string; content: string }>('message', {
                data: { command: 'showResponse', content: message.promptContent }
            });
            window.dispatchEvent(event);
        },
    };
}

const App = () => {
    const promptInput = useStore(state => state.promptInput);
    const systemInput = useStore(state => state.systemInput);
    const responses = useStore(state => state.responses)
    const [isLoading, setIsLoading] = useState(false);
    const [replace, setReplace] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('message', (event) => {
            const message = event.data;

            if (message.command === 'setLoading') {
                setIsLoading(message.isLoading)
            }

            if (message.command === 'showResponse') {
                useStore.setState(state => ({ responses: [...state.responses, message] }));
            }

            if (message.command === 'updateSystemInput') {
                useStore.setState({ systemInput: message.systemMessage });
            }
        });
    }, []);

    const handleSettingsButtonClick = () => {
        setIsSettingsOpen(c => !c);
    };

    const handleClearStorageClick = () => {
        useStore.persist.clearStorage()
        useStore.setState({
            prompts: [],
            promptInput: '',
            systemInput: '',
            responses: []
        })
        setIsSettingsOpen(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        onSubmitRequest(systemInput, promptInput, replace)
    };

    return (
        <div className="bg-gray-900 text-white h-full w-full p-5" style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <div className="flex items-center justify-between mb-4 mt-2">
                <div>
                    <h1 className="text-3xl font-bold">GPT Sensei</h1>
                </div>
                <div className="flex flex-row space-x-5">
                    <RadioSwitch value={replace} setValue={setReplace} label="Replace selection" />
                    <div className="relative">
                        <button onClick={handleSettingsButtonClick} className="rounded-full h-8 w-8 bg-gray-800 text-white focus:outline-none flex justify-center items-center">
                            <IoMdSettings size={24} />
                        </button>
                        {isSettingsOpen && (
                            <div className="absolute top-8 right-0 w-40 overflow-hidden rounded shadow-lg bg-white z-10">
                                <button onClick={handleClearStorageClick} className="w-full py-2 px-4 text-gray-700 hover:bg-gray-100">Clear all storage</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <InputForm
                label="System input"
                value={systemInput}
                onChange={(newValue: string) => useStore.setState({ systemInput: newValue })}
            />
            <InputForm
                label="Prompt input"
                value={promptInput}
                onChange={(newValue: string) => useStore.setState({ promptInput: newValue })}
            />
            <div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    {isLoading ? <LoadingIndicator /> : 'Submit'}
                </button>
                <ResponseContainer responses={responses} />
            </div>
        </div >
    );
};

export default App;