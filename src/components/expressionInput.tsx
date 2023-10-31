import { useState } from 'react';

interface Iprops {
    selectedFlags: string[]
}


const ExpressionInput: React.FC<Iprops> = ({ selectedFlags }) => {

    const [input, setInput] = useState('');


    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {

        // @ts-ignore
        setInput(e.target.innerText)

        // todo's
        // replace each char with <span>{char}</span>
        // replace space with '.'(can be found in App.css)
        // find out all operators and a color if these are present and if these char will be used as operators, if in char-set ignore
        // color to escaped strings
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (e.key === 'Enter') return e.preventDefault()

    }

    return (
        <pre className="py-2 px-4 w-full scroll-bar
            [&>*]:inline-block overflow-x-auto
            md:px-10">
            <div className="text-primary text-xl">/</div>
            <div onInput={handleInputChange} onKeyDown={handleKeyDown} className="min-w-[0.6rem] single-line outline-none"
                contentEditable={true}></div>

            <div className="text-primary text-xl">/{selectedFlags.join('')}</div>
        </pre>
    );
}

export default ExpressionInput;