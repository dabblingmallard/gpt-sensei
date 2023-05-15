export type Extension = ".js" | ".ts" | ".jsx" | ".tsx" | ".py" | ".java" | ".c" | ".cpp" | ".cs" | ".rb" | ".php" | ".html" | ".css" | ".go" | ".scala" | ".swift" | ".dart" | ".groovy" | ".kotlin" | ".lua" | ".perl" | ".r" | ".rust" | ".sh" | ".sql" | ".xml" | ".yaml" | ".markdown" | ".md" | ".json" | ".ex" | ".exs" | ".elm" | ".erl" | ".fs" | ".fsx" | ".h" | ".hpp" | ".hs" | ".kt" | ".ktm" | ".kts" | ".m" | ".mm" | ".objc" | ".rs" | ".scala" | ".sc" | ".as" | ".asp" | ".aspx" | ".ejs" | ".hbs";
type Language = "JavaScript" | "TypeScript" | "React" | "TypeScript React" | "Python" | "Java" | "C" | "C++" | "C#" | "Ruby" | "PHP" | "HTML" | "CSS" | "Go" | "Scala" | "Swift" | "Dart" | "Groovy" | "Kotlin" | "Lua" | "Perl" | "R" | "Rust" | "Shell" | "SQL" | "XML" | "YAML" | "Markdown" | "Elixir" | "Elm" | "Erlang" | "F#" | "Haskell" | "Objective-C" | "ActionScript" | "ASP" | "ASP.NET" | "EJS" | "Handlebars";

export function getLastPart(filename: string): string {
    const splittedPath = filename.split(/\/|\\\\/);
    return splittedPath[splittedPath.length - 1];
}

export const getFileLanguage = (extension: Extension): Language | null => {
    switch (extension) {
        case ".js":
            return "JavaScript";
        case ".ts":
            return "TypeScript";
        case ".jsx":
            return "React";
        case ".tsx":
            return "TypeScript React";
        case ".py":
            return "Python";
        case ".java":
            return "Java";
        case ".c":
            return "C";
        case ".cpp":
            return "C++";
        case ".cs":
            return "C#";
        case ".rb":
            return "Ruby";
        case ".php":
            return "PHP";
        case ".html":
            return "HTML";
        case ".css":
            return "CSS";
        case ".go":
            return "Go";
        case ".swift":
            return "Swift";
        case ".dart":
            return "Dart";
        case ".groovy":
            return "Groovy";
        case ".kotlin":
            return "Kotlin";
        case ".lua":
            return "Lua";
        case ".perl":
            return "Perl";
        case ".r":
            return "R";
        case ".rust":
            return "Rust";
        case ".sh":
            return "Shell";
        case ".sql":
            return "SQL";
        case ".xml":
            return "XML";
        case ".yaml":
            return "YAML";
        case ".md":
        case ".markdown":
            return "Markdown";
        case ".ex":
        case ".exs":
            return "Elixir";
        case ".elm":
            return "Elm";
        case ".erl":
            return "Erlang";
        case ".fs":
        case ".fsx":
            return "F#";
        case ".h":
        case ".hpp":
            return "C++";
        case ".hs":
            return "Haskell";
        case ".kt":
        case ".ktm":
        case ".kts":
            return "Kotlin";
        case ".m":
        case ".mm":
            return "Objective-C";
        case ".objc":
            return "Objective-C";
        case ".rs":
            return "Rust";
        case ".scala":
        case ".sc":
            return "Scala";
        case ".as":
            return "ActionScript";
        case ".asp":
            return "ASP";
        case ".aspx":
            return "ASP.NET";
        case ".ejs":
            return "EJS";
        case ".hbs":
            return "Handlebars";
        default:
            return null;
    }
};