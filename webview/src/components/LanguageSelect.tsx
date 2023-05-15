import { useState } from "react";

type LanguageId = "javascriptreact" | "typescriptreact" | "abap" | "bat" | "clojure" | "coffeescript" | "cpp" | "csharp" | "css" | "dockerfile" | "fsharp" | "go" | "graphql" | "handlebars" | "html" | "ini" | "java" | "javascript" | "json" | "lua" | "markdown" | "objective-c" | "perl" | "php" | "plaintext" | "powershell" | "python" | "r" | "razor" | "ruby" | "rust" | "scss" | "shellscript" | "solidity" | "sql" | "swift" | "typescript" | "vb" | "xml" | "yaml";

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
    onChange: (id: string) => void;
}

export const LanguageSelect = ({ onChange }: LanguageSelectProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>(languages[0].value);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value as LanguageId);
        onChange(event.target.value);
    };

    return (
        <div className="w-64 px-4 py-2 bg-gray-800 text-gray-200 rounded-md relative">
            <select
                className="w-full h-full p-2 pr-8 cursor-pointer appearance-none bg-transparent border-none focus:outline-none"
                value={selectedLanguage}
                onChange={handleLanguageChange}
            >
                {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </select>
            <div
                className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.293 7.707a1 1 0 01-1.414 1.414L2.586 6.414a1 1 0 010-1.414L4.879 2.29a1 1 0 111.414 1.414L4.828 5H13a1 1 0 010 2H4.828l1.465 1.293a1 1 0 11-1.414 1.414z"
                    />
                </svg>
            </div>
        </div>
    );
};
