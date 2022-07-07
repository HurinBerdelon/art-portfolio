import { createContext, ReactNode, useContext, useState } from "react";
import { DefaultTheme } from "styled-components";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ThemeProviderProps {
    children: ReactNode
}

interface ThemeContextProps {
    currentTheme: DefaultTheme
    toggleCurrentTheme(): void
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

export function CurrentThemeProvider({ children }: ThemeProviderProps): JSX.Element {

    const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(light)

    // TODO: Persist theme on LocalStorage

    function toggleCurrentTheme() {
        if (currentTheme.title === 'dark') setCurrentTheme(light)
        if (currentTheme.title === 'light') setCurrentTheme(dark)
    }

    return (
        <ThemeContext.Provider
            value={{ currentTheme, toggleCurrentTheme }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useCurrentTheme() {
    return useContext(ThemeContext)
}