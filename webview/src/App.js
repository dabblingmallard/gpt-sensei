"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InputForm_1 = require("./components/InputForm");
const LoadingIndicator_1 = require("./components/LoadingIndicator");
const ResponseContainer_1 = require("./components/ResponseContainer");
const prompts_1 = require("./utils/prompts");
const App = () => {
    const [systemInput, setSystemInput] = (0, react_1.useState)('');
    const [promptInput, setPromptInput] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [response, setResponse] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.command === 'showResponse') {
                setIsLoading(false);
                setResponse(message.content);
            }
            if (message.command === 'updateSystemInput') {
                setSystemInput((0, prompts_1.systemMessage)(message));
            }
        });
    }, []);
    const handleSubmit = async () => {
        setIsLoading(true);
        window.vscode.postMessage({
            command: 'submit',
            systemContent: systemInput,
            promptContent: promptInput
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-900 text-white", children: [(0, jsx_runtime_1.jsx)(InputForm_1.InputForm, { systemInput: systemInput, onSystemInputChange: setSystemInput, promptInput: promptInput, onPromptInputChange: setPromptInput, onSubmit: handleSubmit }), isLoading ? (0, jsx_runtime_1.jsx)(LoadingIndicator_1.LoadingIndicator, {}) : (0, jsx_runtime_1.jsx)(ResponseContainer_1.ResponseContainer, { response: response })] }));
};
exports.default = App;
//# sourceMappingURL=App.js.map