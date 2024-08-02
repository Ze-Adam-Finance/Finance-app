import { Box, Typography, useTheme } from "@mui/material";
import defaultImage from "../assets/screendefault.jpg"; // Adjust the path based on the actual file location

const DefaultContainer = () => {
	const theme = useTheme(); // Get the current theme

	// Determine overlay color based on theme mode
	const overlayColor =
		theme.palette.mode === "dark"
			? "rgba(0, 0, 0, 0.4)"
			: "rgba(255, 255, 255, 0.8)";

	const textColor = theme.palette.mode === "dark" ? "#E0E0E0" : "#000000";

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "auto",
				overflow: "hidden",
				position: "relative",
				maxWidth: "1200px",
				mx: "auto",
				"& img": {
					width: "100%",
					height: "100%",
					objectFit: "cover",
				},
			}}
		>
			<img src={defaultImage} alt="Default" />
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: overlayColor,
					zIndex: 1, // Ensure the overlay is above the image
				}}
			/>
			<Typography
				sx={{
					position: "absolute",
					top: {
						// Center vertically on mobile, tablet / position higher up on desktop
						xs: "50%",
						sm: "50%",
						md: "25%",
					},
					left: "50%",
					transform: {
						xs: "translate(-50%, -50%)",
						sm: "translate(-50%, -50%)",
						md: "translate(-50%, -25%)",
					},
					color: textColor,
					zIndex: 2,
					textAlign: "center",
					maxWidth: "80%",
					px: 2,
					py: 1,
					borderRadius: 1,
					fontSize: {
						xs: "1rem",
						sm: "1.5rem",
						md: "2rem",
						lg: "2.5rem",
					},
				}}
				variant="h4"
			>
				Search for a company above, in order to get started
			</Typography>
		</Box>
	);
};

export default DefaultContainer;
