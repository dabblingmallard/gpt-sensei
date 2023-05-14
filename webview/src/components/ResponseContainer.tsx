import React from 'react';

type ResponseContainerProps = {
    response: string;
};

export const ResponseContainer: React.FC<ResponseContainerProps> = ({ response }) => (
    <div className="mt-4 max-w-prose overflow-auto">
        <pre>{response}</pre>
    </div>
);