"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemMessage = void 0;
const systemMessage = (message = {}) => {
    return [
        `You are a ${message.languageName ?? 'Software Engineering'} expert.`,
        message.fileName ? `Your response will be placed in a file called '${message.fileName}'` : '',
        `You only write code. Do not provide explanations.`
    ].join(' ');
};
exports.systemMessage = systemMessage;
//# sourceMappingURL=prompts.js.map