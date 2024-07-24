import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	//Add build if you are going to use a Git-based (Github or CodeCommit) deployement
	build: {
		outDir: "dist",
	},
	// Not sure is necessary
	/* resolve: {
    alias: [
    {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser',
    },
  ]
}, */
});
