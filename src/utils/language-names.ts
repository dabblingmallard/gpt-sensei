export type Extension = ".js" | ".ts" | ".jsx" | ".tsx" | ".py" | ".java" | ".c" | ".cpp" | ".cs" | ".rb" | ".php" | ".html" | ".css" | ".go" | ".scala" | ".swift" | ".dart" | ".groovy" | ".kotlin" | ".lua" | ".perl" | ".r" | ".rust" | ".sh" | ".sql" | ".xml" | ".yaml" | ".markdown" | ".md" | ".json" | ".ex" | ".exs" | ".elm" | ".erl" | ".fs" | ".fsx" | ".h" | ".hpp" | ".hs" | ".kt" | ".ktm" | ".kts" | ".m" | ".mm" | ".objc" | ".rs" | ".scala" | ".sc" | ".as" | ".asp" | ".aspx" | ".ejs" | ".hbs";
type Language = "JavaScript" | "TypeScript" | "React" | "TypeScript React" | "Python" | "Java" | "C" | "C++" | "C#" | "Ruby" | "PHP" | "HTML" | "CSS" | "Go" | "Scala" | "Swift" | "Dart" | "Groovy" | "Kotlin" | "Lua" | "Perl" | "R" | "Rust" | "Shell" | "SQL" | "XML" | "YAML" | "Markdown" | "Elixir" | "Elm" | "Erlang" | "F#" | "Haskell" | "Objective-C" | "ActionScript" | "ASP" | "ASP.NET" | "EJS" | "Handlebars";
type MarkdownPreTagLang = "javascript" | "typescript" | "jsx" | "tsx" | "python" | "java" | "c" | "cpp" | "cs" | "ruby" | "php" | "html" | "css" | "go" | "swift" | "dart" | "groovy" | "kotlin" | "lua" | "perl" | "r" | "rust" | "shell" | "sql" | "xml" | "yaml" | "markdown" | "elixir" | "elm" | "erlang" | "fsharp" | "c" | "haskell" | "kotlin" | "objectivec" | "objectivec" | "rust" | "scala" | "actionscript" | "asp" | "aspnet" | "ejs" | "handlebars";

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

export const getMarkdownLanguage = (extension: Extension): MarkdownPreTagLang | null => {
    switch (extension) {
        case ".js":
            return "javascript";
        case ".ts":
            return "typescript";
        case ".jsx":
            return "jsx";
        case ".tsx":
            return "tsx";
        case ".py":
            return "python";
        case ".java":
            return "java";
        case ".c":
            return "c";
        case ".cpp":
            return "cpp";
        case ".cs":
            return "cs";
        case ".rb":
            return "ruby";
        case ".php":
            return "php";
        case ".html":
            return "html";
        case ".css":
            return "css";
        case ".go":
            return "go";
        case ".swift":
            return "swift";
        case ".dart":
            return "dart";
        case ".groovy":
            return "groovy";
        case ".kotlin":
            return "kotlin";
        case ".lua":
            return "lua";
        case ".perl":
            return "perl";
        case ".r":
            return "r";
        case ".rust":
            return "rust";
        case ".sh":
            return "shell";
        case ".sql":
            return "sql";
        case ".xml":
            return "xml";
        case ".yaml":
            return "yaml";
        case ".md":
        case ".markdown":
            return "markdown";
        case ".ex":
        case ".exs":
            return "elixir";
        case ".elm":
            return "elm";
        case ".erl":
            return "erlang";
        case ".fs":
        case ".fsx":
            return "fsharp";
        case ".h":
        case ".hpp":
            return "c";
        case ".hs":
            return "haskell";
        case ".kt":
        case ".ktm":
        case ".kts":
            return "kotlin";
        case ".m":
        case ".mm":
            return "objectivec";
        case ".objc":
            return "objectivec";
        case ".rs":
            return "rust";
        case ".scala":
        case ".sc":
            return "scala";
        case ".as":
            return "actionscript";
        case ".asp":
            return "asp";
        case ".aspx":
            return "aspnet";
        case ".ejs":
            return "ejs";
        case ".hbs":
            return "handlebars";
        default:
            return null;
    }
};