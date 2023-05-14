
export const systemMessage = (message: any = {}) => {
    return [
        `You are a ${message.languageName ?? 'Software Engineering'} expert.`,
        message.fileName ? `Your response will be placed in a file called '${message.fileName}'` : '',
        `You only write code. Do not provide explanations.`
    ].join(' ')
}