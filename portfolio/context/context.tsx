import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

function ThemeProvider({children}) {
    const [theme, setTheme] = useState("dark");

    function handleThemeChange() {
        if(theme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    return (
        <ThemeContext.Provider value={{theme, handleThemeChange}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;