import Searchbar from "./components/Searchbar";
import { useState, useEffect } from "react";
import { Container, Box, Divider, Typography } from "@mui/material";
import TabComponent from "./components/TabComponent";

const App = () => {
	const [selectedCompany, setSelectedCompany] = useState("");
	const [companyData, setCompanyData] = useState([]);

	const fetchDataForCompany = async (company) => {
		console.log(`Fetching data for company: ${company}`);
		try {
			company = company.split("-")[0].trim();

			const response1 = await fetch(
				`https://financialmodelingprep.com/api/v3/profile/${company}?apikey=9ea462a62531d93aa2be881a058c3951`
			);
			const profileData = await response1.json();

			const companyData = profileData;

			console.log(companyData);

			return companyData;
		} catch (error) {
			console.error("Error fetching company data:", error);
		}
	};

	useEffect(() => {
		if (selectedCompany) {
			fetchDataForCompany(selectedCompany).then((data) => {
				console.log("API call finished.", data);
				setCompanyData(data);
			});
		}
	}, [selectedCompany]);

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
					<TabComponent companyData={companyData} />
				</Box>
			)}
		</Container>
	);
};

export default App;
