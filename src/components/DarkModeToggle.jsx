import { IconButton, Typography, Box } from "@mui/material";
import {
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useDarkMode } from "../hooks/useDarkMode.js";

const DarkModeToggle = () => {
	const theme = useTheme(); // Get the current theme (light or dark mode)
	const darkMode = useDarkMode(); // Get the toggle function for dark mode
	const isLessThan1400px = useMediaQuery("(max-width:1400px)"); // Check if the screen width is less than 1400px

	return (
		<IconButton
			onClick={darkMode.toggleDarkMode} // Toggle between dark and light mode on click
			color="inherit"
			sx={{
				"&:hover": {
					"& .mode-text": {
						fontWeight: "bold",
					},
				},
			}}
		>
			{theme.palette.mode === "dark" ? (
				<Box display="flex" alignItems="center">
					{!isLessThan1400px && (
						<Typography
							className="mode-text"
							style={{ marginRight: 8 }}
							variant="body2"
						>
							Light Mode
						</Typography>
					)}
					<Brightness7Icon />
				</Box>
			) : (
				<Box display="flex" alignItems="center">
					{!isLessThan1400px && (
						<Typography
							className="mode-text"
							style={{ marginRight: 8 }}
							variant="body2"
						>
							Dark Mode
						</Typography>
					)}
					<Brightness4Icon />
				</Box>
			)}
		</IconButton>
	);
};

export default DarkModeToggle;
