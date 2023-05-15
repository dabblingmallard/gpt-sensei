import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResponseContainer } from './components/ResponseContainer';
import { onSubmitRequest, setAutoSystemInput, useStore } from './store/useStore';
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
    const replace = useStore(state => state.replace);
    const autoInput = useStore(state => state.autoInput);
    const responses = useStore(state => state.responses)
    const [isLoading, setIsLoading] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleOffClick = (event: any) => {
        const target: HTMLElement = event.target;
        const settingsButton = document.getElementById('settings-button');
        const settingsDropdown = document.getElementById('settings-dropdown');

        if (settingsButton && !settingsButton.contains(target) && !settingsDropdown?.contains(target)) {
            setIsSettingsOpen(false);
        }
    };

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
        window.addEventListener('click', handleOffClick);
        return () => {
            window.removeEventListener('click', handleOffClick);
        };
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
                <h1 className="text-3xl font-bold">GPT Sensei</h1>
                <button id="settings-button" onClick={handleSettingsButtonClick} className="rounded-full h-8 w-8 bg-gray-800 text-white focus:outline-none flex justify-center items-center">
                    <IoMdSettings size={24} />
                </button>
                {isSettingsOpen && (
                    <div id="settings-dropdown" className="absolute top-14 right-10 shadow-lg bg-gray-800 px-2 py-2 rounded-sm z-10">
                        <RadioSwitch value={replace} setValue={v => useStore.setState({ replace: v })} label="Replace selection" />
                        <RadioSwitch value={autoInput} setValue={v => { setAutoSystemInput(v) }} label="Auto system input" />
                        <hr className="my-2 border-gray-700" />
                        <button onClick={handleClearStorageClick} className="w-full leading-5 text-gray-400 hover:text-white">Clear all storage</button>
                    </div>
                )}
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