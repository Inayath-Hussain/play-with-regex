import { useEffect, useState } from "react";

type themes = 'dark' | 'light'

const useTheme = () => {
    const ls = localStorage.getItem('theme');

    const savedTheme = ls === 'dark' ||
        ls === 'light' ? ls : null

    const [theme, setTheme] = useState<themes>(savedTheme || 'dark');

    useEffect(() => {
        // store theme value to localStorage if there's none saved
        if (!ls) localStorage.setItem('theme', 'dark')

        // if theme is set to dark add dark class to html tag
        if (theme === 'dark') document.documentElement.classList.add('dark')
    }, [])


    // updates state variable and toggles 'dark' class
    const toggle = () => {
        const changeTo: themes = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.classList.toggle('dark')

        setTheme(changeTo)
        localStorage.setItem('theme', changeTo)
    }

    return { theme, toggle };
}

export default useTheme;