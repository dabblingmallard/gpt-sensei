"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const InputForm = ({ systemInput, onSystemInputChange, promptInput, onPromptInputChange, onSubmit }) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "systemInput", className: "block text-sm font-medium text-gray-300", children: "System" }), (0, jsx_runtime_1.jsx)("textarea", { id: "systemInput", value: systemInput, onChange: (e) => onSystemInputChange(e.target.value), rows: 5, className: "resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-800 text-white" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "promptInput", className: "block mt-4 text-sm font-medium text-gray-300", children: "Prompt" }), (0, jsx_runtime_1.jsx)("textarea", { id: "promptInput", value: promptInput, onChange: (e) => onPromptInputChange(e.target.value), rows: 5, className: "resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1 bg-gray-800 text-white" }), (0, jsx_runtime_1.jsx)("button", { onClick: onSubmit, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4", children: "Submit" })] }));
exports.InputForm = InputForm;
//# sourceMappingURL=InputForm.js.map