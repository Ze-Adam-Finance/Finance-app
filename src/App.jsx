import Searchbar from "./components/Searchbar";
import Title from "./components/Title";
import { Container, Box } from "@mui/material";

const App = () => {
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Title />
			<Searchbar />
		</Container>
	);
};

export default App;
