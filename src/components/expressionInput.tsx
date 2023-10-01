import { useState, useRef } from 'react';
import sanitizeHTML from 'sanitize-html'
import htmlReactParser from 'html-react-parser'

interface Iprops {
    selectedFlags: string[]
}

const ExpressionInput: React.FC<Iprops> = ({ selectedFlags }) => {

    const [input, setInput] = useState('');
    const editableDivRef = useRef<HTMLDivElement | null>(null)

    const handleInputChange = (e: React.SyntheticEvent<HTMLDivElement>) => {


        // todo's
        // replace each char with <span>{char}</span>
        // replace space with '.'(can be found in App.css)
        // find out all operators and a color if these are present and if these char will be used as operators, if in char-set ignore
        // color to escaped strings
    }

    return (
        <pre className="py-2 px-4 w-full scroll-bar
            [&>*]:inline-block overflow-x-auto
            md:px-10">
            <div className="text-primary text-xl">/</div>
            <div onInput={handleInputChange} className="min-w-[0.5rem] whitespace-nowrap outline-none"
                contentEditable={true} ref={editableDivRef}></div>
            <div className="text-primary text-xl">/{selectedFlags.join('')}</div>
        </pre>
    );
}

export default ExpressionInput;