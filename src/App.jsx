import Searchbar from "./components/Searchbar";
import { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import { Container, Box, Divider, Typography } from "@mui/material";

const App = () => {
	const [selectedCompany, setSelectedCompany] = useState("");
	const [companyData, setCompanyData] = useState([]);

	const randomName = () => {
		const names = [
			"Alpha",
			"Bravo",
			"Charlie",
			"Delta",
			"Echo",
			"Foxtrot",
			"Golf",
			"Hotel",
			"India",
			"Juliet",
		];
		return names[Math.floor(Math.random() * names.length)];
	};

	// Dummy function to simulate an API call
	const fetchDataForCompany = async (company) => {
		console.log(`Fetching data for company: ${company}`);
		return new Promise((resolve) => {
			setTimeout(() => {
				const dummyData = Array.from({ length: 5 }, () => ({
					name: `${randomName()} `,
					calories: Math.floor(Math.random() * 500),
					fat: Math.floor(Math.random() * 100) / 10,
					carbs: Math.floor(Math.random() * 100),
					protein: Math.floor(Math.random() * 50) / 10,
				}));
				console.log("Data fetched successfully");
				resolve(dummyData);
			}, 1000);
		});
	};

	useEffect(() => {
		if (selectedCompany) {
			// Call the dummy function to simulate an API call
			fetchDataForCompany(selectedCompany).then((data) => {
				console.log("API call finished.");
				setCompanyData(data); // Store the fetched data in state
			});
		}
	}, [selectedCompany]); // Dependency array: useEffect will run when selectedCompany changes

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
				<Typography variant={"h2"}>Finance App</Typography>
				<Searchbar
					setSelectedCompany={setSelectedCompany}
					selectedCompany={selectedCompany}
				/>
			</Box>
			<Divider sx={{ width: "100%", my: 4 }} />
			{selectedCompany && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography
						variant={"h4"}
						sx={{
							mb: 4,
						}}
					>
						{selectedCompany}
					</Typography>
					<DataTable data={companyData} />
				</Box>
			)}
		</Container>
	);
};

export default App;
