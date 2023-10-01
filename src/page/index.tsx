import { useState, useRef } from "react";
import Flags from "../components/flags";
import ExpressionInput from "../components/expressionInput";

const IndexPage = () => {
    const buttonRef = useRef<HTMLDivElement | null>(null)
    const [isDropDownOpen, setDropDownStatus] = useState(false)

    const [selectedFlags, setSelectedFlags] = useState<string[]>(['g'])

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

    return (
        <div>
            <div className="bg-secondary flex flex-row justify-between items-center px-4 py-2
            md:px-10">
                <p className="text-xl md:text-2xl">Expression</p>

                <div className="flex flex-row justify-center items-center gap-3 md:gap-6">
                    <p className="text-base md:text-base p-2 py-1 bg-background rounded-md cursor-default">
                        &lt;&gt;
                        JavaScript</p>

                    <div ref={buttonRef} className="flex flex-row justify-center items-center relative
                    bg-primary pl-2 pr-4 py-1 rounded-md cursor-pointer" onClick={handleDropDown}>
                        Flags
                        <div id="flags" className={`${isDropDownOpen ? 'drop-down-open' : ''} ml-[6px] -top-[2px] w-2 h-4 mb-1`} />

                        <Flags isDropDownOpen={isDropDownOpen} handleDropDown={handleDropDown}
                            selectedFlags={selectedFlags} handleSelection={handleFlagSelection} buttonRef={buttonRef} />
                    </div>

                </div>
            </div>


            {/* <pre className="py-2 px-4 w-full scroll-bar
            [&>*]:inline-block overflow-x-auto
            md:px-10">
                <div className="text-primary text-xl">/</div>
                <div onInput={e => console.log(e.target.textContent)} className="min-w-[0.5rem] whitespace-nowrap outline-none" contentEditable={true}></div>
                <div className="text-primary text-xl">/{selectedFlags.join('')}</div>
            </pre> */}
            <ExpressionInput selectedFlags={selectedFlags} />



            <div className="bg-secondary text-2xl py-2 px-4
            md:px-10">
                Text
            </div>

        </div>
    );
}

export default IndexPage;