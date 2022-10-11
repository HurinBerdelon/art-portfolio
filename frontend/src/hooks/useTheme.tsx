import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { localStorageKeys } from "../config/localStorageKeys";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";
import { usePersistedState } from "./usePersistedState";

interface ThemeProviderProps {
    children: ReactNode
}

interface ThemeContextProps {
    currentTheme: DefaultTheme
    toggleCurrentTheme(): void
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

export function CurrentThemeProvider({ children }: ThemeProviderProps): JSX.Element {

    const [currentTheme, setCurrentTheme] = usePersistedState<DefaultTheme>(localStorageKeys.theme, light)

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