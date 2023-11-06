import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import CodeMirror, { Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror'
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

    const codeMirrorRef = useRef<ReactCodeMirrorRef | null>(null);
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


        return () => {
            document.removeEventListener('themeChange', createCodeMirrorTheme)
        }
    }, [])

    const focus = () => {
        // e: React.MouseEvent<HTMLDivElement, MouseEvent>

        if (!codeMirrorRef.current) return
        codeMirrorRef.current.view?.focus()
    }

    return (
        <>
            {/* <div onInput={handleInputChange} ref={ref} contentEditable={true} className="flex-auto outline-0 p-4 max-h-full overflow-y-auto vertical-scroll-bar"></div> */}
            <CodeMirror className='bg-background text-lg cursor-text flex-auto max-h-full p-2 whitespace-normal w-screen no-flex overflow-y-auto vertical-scroll-bar' theme={codeMirrorTheme}
                basicSetup={{ lineNumbers: false, foldGutter: false, highlightActiveLine: false }}
                onClick={focus} ref={codeMirrorRef} style={{ maxWidth: '100vw', wordBreak: 'break-word', display: 'block' }} />
        </>
    );
}

export default TextInput;