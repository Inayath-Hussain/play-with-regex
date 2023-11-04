export type themes = 'dark' | 'light'


export const themeLS = {
    getTheme(): themes {
        return localStorage.getItem('theme') as themes || 'dark'
    },

    setTheme(theme: themes) {
        localStorage.setItem('theme', theme)
    }
}