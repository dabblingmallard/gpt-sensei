import React from 'react';

export const LoadingIndicator: React.FC = () => (
    <div className="w-5 h-5">
        <svg className="animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 1.962.522 3.8 1.458 5.332l2.879-1.565z"
            ></path>
        </svg>
    </div>
);