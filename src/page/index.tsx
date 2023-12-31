import { useState, useEffect, useRef } from "react";
import Flags from "../components/flags";
import ExpressionInput from "../components/expressionInput";
import TextInput from "../components/textInput";

const IndexPage = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [isDropDownOpen, setDropDownStatus] = useState(false)

    const [selectedFlags, setSelectedFlags] = useState<string[]>(['g'])

    const [expressionInput, setExpressionInput] = useState('');

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

        // cannot remove 'g' flag because MatchDecorator requires the regex to have 'g' flag.
        if (value === "g") return

        if (selectedFlags.includes(value)) {
            newArr = newArr.filter(v => v !== value)
        }
        else {
            newArr.push(value)
        }
        setSelectedFlags(newArr)
    }




    return (
        <>
            <div>
                <div className="bg-secondary flex flex-row justify-between items-center px-4 py-2 
                md:px-10">
                    <p className="text-base sm:text-2xl"> Expression </p>

                    <div className="flex flex-row justify-center items-center gap-3 md:gap-6">
                        <p className="text-sm p-1 py-1 bg-background rounded-md cursor-default
                        md:p-2 sm:text-base
                         ">
                            &lt;&gt;JavaScript </p>

                        <button ref={buttonRef} className="flex flex-row justify-center items-center relative text-sm
                                bg-primary text-text pl-2 pr-4 py-1 rounded-md cursor-pointer
                                sm:text-base" onClick={handleDropDown}>
                            Flags
                            <div id="flags" className={`${isDropDownOpen ? 'drop-down-open' : ''} ml-[6px] -top-[2px] w-2 h-4 mb-1`
                            } />

                            {isDropDownOpen && <Flags isDropDownOpen={isDropDownOpen} handleDropDown={handleDropDown}
                                selectedFlags={selectedFlags} handleSelection={handleFlagSelection} buttonRef={buttonRef} />}
                        </button>

                    </div>
                </div>




                <ExpressionInput selectedFlags={selectedFlags}
                    setExpressionInput={setExpressionInput} />


                <div className="bg-secondary text-lg py-2 px-4 flex justify-between items-center
                md:px-10 sm:text-xl">
                    Text

                    {/* <button onClick={testRegex} className="active:scale-90 active:outline-none border-none bg-primary px-4 py-[2px] rounded-lg text-lg text-text">
                        RUN</button> */}
                </div>


            </div>
            <TextInput expressionInput={expressionInput} flags={selectedFlags.join("")} />
        </>
    );
}

export default IndexPage;