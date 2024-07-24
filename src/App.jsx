import Searchbar from "./components/Searchbar";
import Title from "./components/Title";
import DataTable from "./components/DataTable";
import { Container, Box, Divider } from "@mui/material";

const App = () => {
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pt: 4, // Adding padding at the top to space out from the top of the container
			}}
		>
			<Title />
			<Searchbar />
			<Divider sx={{ width: "100%", my: 4 }} />{" "}
			{/* Full width divider with margin bottom */}
			<Box sx={{ width: "100%" }}>
				{" "}
				{/* Margin top to create space above the DataTable */}
				<DataTable />
			</Box>
		</Container>
	);
};

export default App;
