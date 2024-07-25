import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
	},
	resolve: {
		alias: {
			"@mui/icons-material": "@mui/icons-material",
			"@mui/material": "@mui/material",
		},
	},
});
