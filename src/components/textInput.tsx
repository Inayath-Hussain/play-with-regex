import React, { useEffect, useRef, useState } from 'react';

import CodeMirror, {
    Extension,
    ReactCodeMirrorRef,
    highlightWhitespace,
    keymap,
    // KeyBinding,
    MatchDecorator,
    Decoration,
    ViewPlugin
} from '@uiw/react-codemirror';

import { createTheme } from '@uiw/codemirror-themes';
import { insertTab, indentLess } from '@codemirror/commands';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind-config';
import { themeLS } from '../utilities/localStorage';

interface Iprops {
    expressionInput: string
    flags: string
}

const TextInput: React.FC<Iprops> = ({ expressionInput, flags }) => {

    // STATES

    // for MatchDecoration extension, Used to highlight strings in user text which match regex provided by user.
    const [resultDecoration, setResultDecoration] = useState<Extension | null>(null);

    // contains extensions for space and tab space visualization and binding tab key with normal tab space.
    const [codeMirrorExtensions, setCodeMirrorExtensions] = useState<Extension[]>([])

    // theme for text and caret color
    const [codeMirrorTheme, setCodeMirrorTheme] = useState<Extension | undefined>(undefined);

    // const [textInput, setTextInput] = useState("");

    // REFS
    const codeMirrorRef = useRef<ReactCodeMirrorRef | null>(null);


    // EFFECTS
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

        // this function call is for initial load. 
        createCodeMirrorTheme()

        document.addEventListener('themeChange', createCodeMirrorTheme)


        return () => {
            document.removeEventListener('themeChange', createCodeMirrorTheme)
        }
    }, [])


    useEffect(() => {

        // add tab space when user clicks tab. Default is indenting the entire line which is disabled below(indentWithTab)
        const indentFromCursor = keymap.of([{ key: 'Tab', run: insertTab, shift: indentLess }])
        setCodeMirrorExtensions([highlightWhitespace(), indentFromCursor])

    }, [])



    useEffect(() => {

        const call = () => {

            // added try catch to avoid errors when there is an invalid regex pattern
            try {
                // defines the element, classNames and inclusivity of start and end pos
                // this is used to define highlight style to be applied
                const decoration = Decoration.mark({ class: "result-highlight", tagName: "span", inclusiveEnd: false, inclusiveStart: true })


                let matchDecorator = new MatchDecorator({ regexp: new RegExp(expressionInput, flags), decoration });


                const plugin = ViewPlugin.define(view => ({
                    decorations: matchDecorator.createDeco(view),

                    update(update) {
                        this.decorations = matchDecorator.updateDeco(update, this.decorations)
                    },
                    destroy() {
                    },
                }), { decorations: v => v.decorations })

                setResultDecoration(plugin.extension)
            }
            catch (ex) {
                console.log(ex)
            }
        }


        // creating extension on empty expressionInput is crashing the app
        if (expressionInput !== "") {
            call();
        }
        else {
            setResultDecoration(null)
        }

    }, [expressionInput, flags]);


    const focus = () => {
        // e: React.MouseEvent<HTMLDivElement, MouseEvent>

        if (!codeMirrorRef.current) return
        codeMirrorRef.current.view?.focus()
    }


    // returns array of all codemirror extensions being used
    const getAllExtensions = (): Extension[] => {
        if (resultDecoration !== null) return [...codeMirrorExtensions, resultDecoration]
        return codeMirrorExtensions
    }


    return (
        <>
            {/* <div onInput={handleInputChange} ref={ref} contentEditable={true} className="flex-auto outline-0 p-4 max-h-full overflow-y-auto vertical-scroll-bar"></div> */}
            <CodeMirror theme={codeMirrorTheme} style={{ wordBreak: 'break-word' }}
                className='bg-background text-lg tracking-[1px] cursor-text flex-auto max-h-full p-2 whitespace-normal w-screen no-flex overflow-y-auto vertical-scroll-bar'
                basicSetup={{ lineNumbers: false, foldGutter: false, highlightActiveLine: false, syntaxHighlighting: true }}
                indentWithTab={false}

                extensions={getAllExtensions()}
                // value={textInput} onChange={(v) => setTextInput(v)}
                onClick={focus} ref={codeMirrorRef} />

        </>
    );
}

export default TextInput;