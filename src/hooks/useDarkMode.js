import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeProvider";

export const useDarkMode = () => {
	return useContext(DarkModeContext);
};

export default useDarkMode;
