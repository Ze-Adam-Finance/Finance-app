import Searchbar from "./components/Searchbar";
import { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import { Container, Box, Divider, Typography } from "@mui/material";

const App = () => {
	const [selectedCompany, setSelectedCompany] = useState("");
	// companyData state initialised
	const [companyData, setCompanyData] = useState([]);

	// GET RID OF THIS, NOT NEEDED -  REPLACE WITH COLUMN LABELS IN DATA TABLE
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

	// REPLACE WITH FUNCTION WITH API
	const fetchDataForCompany = async (company) => {
		console.log(`Fetching data for company: ${company}`);
		try {

			company = company.split("-")[0].trim();

            const response1 = await fetch(`https://financialmodelingprep.com/api/v3/profile/${company}?apikey=9ea462a62531d93aa2be881a058c3951`);
            const profileData = await response1.json();

            //const response2 = await fetch(`https://fmpcloud.io/api/v3/historical-price-full/${company}?serietype=line&apikey=9ea462a62531d93aa2be881a058c3951`);
            //const historicalData = await response2.json();

            /*const companyData = {
                stockTicker: {
                    status_code: response1.status,
                    body: profileData
                },
                historicalPriceData: {
                    status_code: response2.status,
                    body: historicalData
                }
            };*/

			const companyData = profileData;

			console.log(companyData)

			return companyData
		} catch (error) {
            console.error("Error fetching company data:", error);
        }
	};

	// useEffect runs when value of dependancy array changes
	useEffect(() => {
		// 2. And a value is present for selectedCompany
		if (selectedCompany) {
			// 3. then API function is run
			fetchDataForCompany(selectedCompany).then((data) => {
				console.log("API call finished.", data);
				setCompanyData(data);
			});
		}
		// 1. when value of selectedCompany changes...
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
					{/* data passed to component as companyData */}
					<DataTable data={companyData} />
				</Box>
			)}
		</Container>
	);
};

export default App;
