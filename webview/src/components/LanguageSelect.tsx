import { useState } from "react";

export type LanguageId = "javascriptreact" | "typescriptreact" | "abap" | "bat" | "clojure" | "coffeescript" | "cpp" | "csharp" | "css" | "dockerfile" | "fsharp" | "go" | "graphql" | "handlebars" | "html" | "ini" | "java" | "javascript" | "json" | "lua" | "markdown" | "objective-c" | "perl" | "php" | "plaintext" | "powershell" | "python" | "r" | "razor" | "ruby" | "rust" | "scss" | "shellscript" | "solidity" | "sql" | "swift" | "typescript" | "vb" | "xml" | "yaml";

interface LanguageOption {
    label: string;
    value: LanguageId;
}

const languages: LanguageOption[] = [
    { label: "ABAP", value: "abap" },
    { label: "Batch", value: "bat" },
    { label: "Clojure", value: "clojure" },
    { label: "CoffeeScript", value: "coffeescript" },
    { label: "JSX", value: "javascriptreact" },
    { label: "TypeScript React", value: "typescriptreact" },
    { label: "C++", value: "cpp" },
    { label: "C#", value: "csharp" },
    { label: "CSS", value: "css" },
    { label: "Dockerfile", value: "dockerfile" },
    { label: "F#", value: "fsharp" },
    { label: "Go", value: "go" },
    { label: "GraphQL", value: "graphql" },
    { label: "Handlebars", value: "handlebars" },
    { label: "HTML", value: "html" },
    { label: "INI", value: "ini" },
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "JSON", value: "json" },
    { label: "Lua", value: "lua" },
    { label: "Markdown", value: "markdown" },
    { label: "Objective-C", value: "objective-c" },
    { label: "Perl", value: "perl" },
    { label: "PHP", value: "php" },
    { label: "Plain Text", value: "plaintext" },
    { label: "PowerShell", value: "powershell" },
    { label: "Python", value: "python" },
    { label: "R", value: "r" },
    { label: "Razor", value: "razor" },
    { label: "Ruby", value: "ruby" },
    { label: "Rust", value: "rust" },
    { label: "SCSS", value: "scss" },
    { label: "Shell Script", value: "shellscript" },
    { label: "Solidity", value: "solidity" },
    { label: "SQL", value: "sql" },
    { label: "Swift", value: "swift" },
    { label: "TypeScript", value: "typescript" },
    { label: "Visual Basic", value: "vb" },
    { label: "XML", value: "xml" },
    { label: "YAML", value: "yaml" }
];

interface LanguageSelectProps {
    value: LanguageId;
    onChange: (id: LanguageId) => void;
}

export const LanguageSelect = ({ value, onChange }: LanguageSelectProps) => {

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const v = event.target.value as LanguageId
        onChange(v);
    };

    return (
        <div className="inline-flex rounded-md shadow-sm">
            <select
                className="inline-flex items-center px-2 py-1 border border-gray-600 bg-gray-800 text-xs font-medium rounded-sm text-gray-300 hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={value}
                onChange={handleLanguageChange}
            >
                {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
