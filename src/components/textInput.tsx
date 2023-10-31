const TextInput: React.FC = () => {
    // a contentEditable div where we can update innerHTML using html-parser and sanitize-html.
    return (
        <div contentEditable={true} className="flex-auto outline-0 p-4 max-h-full overflow-y-auto vertical-scroll-bar"></div>
    );
}

export default TextInput;