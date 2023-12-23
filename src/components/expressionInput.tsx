import { Dispatch, SetStateAction } from 'react';

interface Iprops {
    selectedFlags: string[],
    // expressionInput: string,
    setExpressionInput: Dispatch<SetStateAction<string>>
}


const ExpressionInput: React.FC<Iprops> = ({ selectedFlags, setExpressionInput }) => {

    // states
    // this is used to auto expand width
    // const [inputWidth, setInputWidth] = useState("0rem");


    // React.FormEvent<HTMLDivElement>
    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {

        // const inputSize = e.target.value.length
        // setInputWidth(`${inputSize * 0.6}rem`)

        setExpressionInput(e.currentTarget.innerText)

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
            md:px-10" aria-label='regular expression pattern input'>
            <div className="text-primary text-xl">/</div>
            <div onInput={handleInputChange} onKeyDown={handleKeyDown} className="min-w-[0.6rem] single-line outline-none"
                contentEditable={true} ></div>
            {/* <input type="text" onChange={handleInputChange} onKeyDown={handleKeyDown}
                style={{ width: inputWidth }} className="min-w-[0.6rem] max-w-full w-auto bg-inherit single-line outline-none"
            /> */}

            <div className="text-primary text-xl">/{selectedFlags.join('')}</div>
        </pre>
    );
}

export default ExpressionInput;