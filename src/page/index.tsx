import { useState } from "react";

const IndexPage = () => {
    const [isDropDownOpen, setDropDownStatus] = useState(false)
    const handleDropDown = () => {
        setDropDownStatus(!isDropDownOpen)
        // if (dropDownArrow.current === null) console.error('dropDownRef is null')
        // dropDownArrow.current?.classList.toggle('drop-down-menu')

        // open and close list of flags

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

                    <div className="flex flex-row justify-center items-center relative
                    bg-primary pl-2 pr-4 py-1 rounded-md cursor-pointer" onClick={handleDropDown}>
                        Flags
                        <div id="flags" className={`${isDropDownOpen ? 'drop-down-open' : ''} ml-[6px] -top-[2px] w-2 h-4 mb-1`} />
                    </div>

                </div>
            </div>

        </div>
    );
}

export default IndexPage;