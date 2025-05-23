import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => {
  return useContext(ThemeContext);
};
export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const toggleTheme = () => {
    const doc = document.querySelector("html");
    const body = document.querySelector("body");
    document.documentElement.classList.toggle("dark")
    if (themeMode === "light") {
      setThemeMode("dark");
      doc.classList.remove("light", "dark");
      body.classList.remove("dark", "light");
      doc.classList.add("dark");
      body.classList.add("dark");
    } else {
      setThemeMode("light");
      doc.classList.remove("light", "dark");
      body.classList.remove("dark", "light");
      doc.classList.add("light");
      body.classList.add("light");
    }
  };
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode,toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
