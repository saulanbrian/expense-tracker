import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import config from "@/tamagui.config";
import { StatusBar } from "react-native";

export type ThemeType = keyof (typeof config)["themes"];

type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider",
    );
  }
  return context;
};

type ThemeContextProviderProps = PropsWithChildren<{
  initialTheme: ThemeType;
}>;

const ThemeContextProvider = ({
  children,
  initialTheme,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const isDark = theme.includes("dark") || theme.includes("black");

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
  }, [theme, isDark]);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
