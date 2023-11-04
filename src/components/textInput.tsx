import React, { Dispatch, SetStateAction, forwardRef, useEffect, useState } from 'react'
import CodeMirror, { Extension } from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes'
import { tags } from '@lezer/highlight'

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind-config';
import { themeLS } from '../utilities/localStorage';

interface Iprops {
    textInput: string
    setTextInput: Dispatch<SetStateAction<string>>
}

const TextInput: React.FC<Iprops> = ({ textInput, setTextInput }) => {
    // a contentEditable div where we can update innerHTML using html-parser and sanitize-html.
    // problem with using innerHTML - dom injection

    const [codeMirrorTheme, setCodeMirrorTheme] = useState<Extension>();

    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {

        setTextInput(e.currentTarget.innerText)
    }

    useEffect(() => {

        /**
         * @dev sets color depending on theme of page
         * @param dark color to set when theme is dark
         * @param light color to set when theme is white
         */
        const chooseColor = (dark: string, light: string) => {
            return themeLS.getTheme() === 'dark' ? dark : light
        }

        function createCodeMirrorTheme() {
            const theme = createTheme({
                theme: 'dark',
                styles: [],
                settings: {
                    caret: chooseColor('#fff', '#000'),
                    selection: chooseColor('#4d4e4f', '#c2c3c4'),
                    selectionMatch: 'transparent'
                }
            })

            setCodeMirrorTheme(theme)
        }

        createCodeMirrorTheme()

        document.addEventListener('themeChange', createCodeMirrorTheme)
    }, [])

    return (
        <>
            {/* <div onInput={handleInputChange} ref={ref} contentEditable={true} className="flex-auto outline-0 p-4 max-h-full overflow-y-auto vertical-scroll-bar"></div> */}
            <CodeMirror className='bg-background text-lg flex-auto max-h-full overflow-y-auto vertical-scroll-bar border-0 outline-none' theme={codeMirrorTheme}
                basicSetup={{ lineNumbers: false, foldGutter: false, highlightActiveLine: false }} />
        </>
    );
}

export default TextInput;