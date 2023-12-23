import { MutableRefObject, useEffect, useRef } from 'react'
import FlagsInput from "./flagsInput"

interface Ilist {
    value: string,
    name: string
}

interface Iprops {
    isDropDownOpen: boolean
    handleDropDown: () => void
    selectedFlags: string[]
    handleSelection: (value: string) => void
    buttonRef: MutableRefObject<HTMLDivElement | null>
}

const Flags: React.FC<Iprops> = ({ isDropDownOpen, handleDropDown, selectedFlags, handleSelection, buttonRef }) => {
    const dropDownRef = useRef<HTMLDivElement | null>(null)

    const flags: Ilist[] = [
        { value: 'g', name: 'global' },
        { value: 'i', name: 'case insensitive' },
        { value: 'm', name: 'multiline' },
        { value: 's', name: 'single line' },
        { value: 'u', name: 'unicode' },
        { value: 'y', name: 'sticky' }
    ]

    useEffect(() => {
        const closeDropDown = (e: MouseEvent) => {
            console.log(buttonRef.current?.contains(e.target as Node))
            if (isDropDownOpen && (dropDownRef.current && !dropDownRef.current.contains(e.target as Node))
                && !buttonRef.current?.contains(e.target as Node)) {

                handleDropDown()
                console.log('close')
            }
        }

        document.addEventListener('click', closeDropDown)

        return () => {
            document.removeEventListener('click', closeDropDown)
        }
    }, [isDropDownOpen])

    return (
        <div ref={dropDownRef} className={`${isDropDownOpen ? 'open' : 'close'} absolute tool-tip cursor-default text-text
        `} onClick={e => e.stopPropagation()}>

            {/* connector(tool-tip arrow) */}
            <div className="border-[10px] border-b-primary border-transparent border-solid w-0 h-0 transition-all duration-500 right-1/2" />

            {/* flag options container */}
            <div className="px-6 bg-secondary z-10 flex flex-col justify-start items-start gap-2 absolute flag-list -right-9 pb-3
            shadow-flags shadow-primary rounded-md
            md:gap-4 md:-right-8 md:pb-6">

                <h2 className="py-3 text-xl border-b border-text w-max
                md:text-xl md:py-6">
                    Expression Flags
                </h2>

                {flags.map(f => (
                    <FlagsInput key={f.value} name={f.name} value={f.value} selected={selectedFlags.includes(f.value)} handleSelection={handleSelection} />
                ))}

            </div>


        </div>
    );
}

export default Flags;