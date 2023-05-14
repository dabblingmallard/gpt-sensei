import React from 'react';

type InputFormProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

export const InputForm: React.FC<InputFormProps> = ({ label, value, onChange }) => {
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <textarea
                id={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={5}
                className="p-2 resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-800 text-white"
            ></textarea>
        </div>
    );
};

