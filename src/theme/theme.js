import { createTheme } from "@mui/material/styles";

const getCustomTheme = (mode) =>
	createTheme({
		palette: {
			mode,
			...(mode === "dark"
				? {
						background: {
							default: "#121212",
							paper: "#1D1D1D",
						},
						text: {
							primary: "#E0E0E0",
							secondary: "#B0B0B0",
						},
				  }
				: {
						background: {
							default: "#FFFFFF",
							paper: "#FFFFFF",
						},
						text: {
							primary: "#000000",
							secondary: "#333333",
						},
				  }),
		},
		components: {
			MuiIconButton: {
				styleOverrides: {
					root: {
						"&:hover": {
							backgroundColor: "transparent",
							"& > *": {
								fontWeight: "bold",
							},
						},
						"&:focus": {
							backgroundColor: "transparent",
						},
					},
				},
				defaultProps: {
					disableRipple: true,
				},
			},
		},
	});

export default getCustomTheme;
