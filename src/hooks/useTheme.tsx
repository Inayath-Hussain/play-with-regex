import { useEffect, useState } from "react";
import { themes, themeLS } from '../utilities/localStorage'


const useTheme = () => {
    const savedTheme = themeLS.getTheme()

    const [theme, setTheme] = useState<themes>(savedTheme);

    const [customEvent] = useState<Event>(new Event('themeChange'))

    useEffect(() => {
        // if theme is set to dark add dark class to html tag
        if (theme === 'dark') document.documentElement.classList.add('dark')
    }, [])


    // updates state variable and toggles 'dark' class
    const toggle = () => {
        const changeTo: themes = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.classList.toggle('dark')

        setTheme(changeTo)
        localStorage.setItem('theme', changeTo)

        document.dispatchEvent(customEvent)
    }

    return { theme, toggle };
}

export default useTheme;