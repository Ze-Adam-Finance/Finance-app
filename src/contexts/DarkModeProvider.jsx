import { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import getCustomTheme from "../theme/theme";

// Create context for dark mode
export const DarkModeContext = createContext({ toggleDarkMode: () => {} });

export const DarkModeProvider = ({ children }) => {
	// Check users system settings for preference
	const prefersDarkMode = useMediaQuery("(prefers-dark-scheme: dark)");

	// Initialise state for current theme
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

	// Cache toggleDarkMode to prevent re-renders
	const darkMode = useMemo(
		() => ({
			toggleDarkMode: () => {
				// Toggles theme mode
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			},
		}),
		[]
	);

	// Remake theme object everytime mode changes
	const theme = useMemo(() => getCustomTheme(mode), [mode]);

	return (
		<DarkModeContext.Provider value={darkMode}>
			<ThemeProvider theme={theme}>
				{/* Enables dark mode for app's background */}
				<CssBaseline />
				{children}
			</ThemeProvider>
		</DarkModeContext.Provider>
	);
};
