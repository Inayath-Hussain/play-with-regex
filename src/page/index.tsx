import { useState, useEffect, useRef } from "react";
import Flags from "../components/flags";
import ExpressionInput from "../components/expressionInput";
import TextInput from "../components/textInput";

const IndexPage = () => {
    const buttonRef = useRef<HTMLDivElement | null>(null)
    const [isDropDownOpen, setDropDownStatus] = useState(false)

    const [selectedFlags, setSelectedFlags] = useState<string[]>(['g'])

    const [expressionInput, setExpressionInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const textInputRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const root = document.getElementById('root')

        root?.classList.add('max-h-screen')

        return () => {
            root?.classList.remove('max-h-screen')
        }
    }, [])

    const handleDropDown = () => {
        setDropDownStatus(!isDropDownOpen)
    }

    const handleFlagSelection = (value: string) => {
        let newArr = [...selectedFlags]
        if (selectedFlags.includes(value)) {
            newArr = newArr.filter(v => v !== value)
        }
        else {
            newArr.push(value)
        }
        setSelectedFlags(newArr)
        console.log(newArr)
    }


    const testRegex = () => {
        const re = new RegExp('(' + expressionInput + ')', selectedFlags.join(''))

        const highLightedText = textInput.replace(re, '<span class="bg-primary">$1</span>')

        console.log(highLightedText)

        if (!textInputRef.current) return console.error('textInputRef is null')

        textInputRef.current.innerHTML = highLightedText
    }


    return (
        <>
            <div>
                <div className="bg-secondary flex flex-row justify-between items-center px-4 py-2 
                md:px-10">
                    <p className="text-xl md:text-2xl"> Expression </p>

                    <div className="flex flex-row justify-center items-center gap-3 md:gap-6">
                        <p className="text-base md:text-base p-2 py-1 bg-background rounded-md cursor-default">
                            &lt;&gt;JavaScript </p>

                        <div ref={buttonRef} className="flex flex-row justify-center items-center relative
                                bg-primary text-white pl-2 pr-4 py-1 rounded-md cursor-pointer" onClick={handleDropDown}>
                            Flags
                            <div id="flags" className={`${isDropDownOpen ? 'drop-down-open' : ''} ml-[6px] -top-[2px] w-2 h-4 mb-1 border-white`
                            } />

                            <Flags isDropDownOpen={isDropDownOpen} handleDropDown={handleDropDown}
                                selectedFlags={selectedFlags} handleSelection={handleFlagSelection} buttonRef={buttonRef} />
                        </div>

                    </div>
                </div>




                <ExpressionInput selectedFlags={selectedFlags}
                    setExpressionInput={setExpressionInput} />


                <div className="bg-secondary text-2xl py-2 px-4 flex justify-between items-center
                md:px-10">
                    Text

                    <button onClick={testRegex} className="active:scale-90 active:outline-none border-none bg-primary px-4 py-[2px] rounded-lg text-lg text-white">RUN</button>
                </div>


            </div>
            <TextInput textInput={textInput} setTextInput={setTextInput} />
        </>
    );
}

export default IndexPage;