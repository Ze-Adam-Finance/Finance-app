import Searchbar from "./components/Searchbar";
import { useState } from "react";

import DataTable from "./components/DataTable";
import { Container, Box, Divider, Typography } from "@mui/material";

const App = () => {
	const [selectedCompany, setSelectedCompany] = useState("");

	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pt: 4,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "10px",
				}}
			>
				<Typography variant={"h2"}>Welcome to Finance App</Typography>
				<Searchbar setSelectedCompany={setSelectedCompany} />
			</Box>
			<Divider sx={{ width: "100%", my: 4 }} />{" "}
			{selectedCompany && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
					}}
				>
					{" "}
					<Typography
						variant={"h4"}
						sx={{
							mb: 4,
						}}
					>
						{selectedCompany || "Company Name will go here"}
					</Typography>
					<DataTable />
				</Box>
			)}
		</Container>
	);
};

export default App;
