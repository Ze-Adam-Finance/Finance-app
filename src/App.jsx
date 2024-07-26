import Searchbar from "./components/Searchbar";
import { useState, useEffect } from "react";
import { Container, Box, Divider, Typography } from "@mui/material";
import TabComponent from "./components/TabComponent";

const App = () => {
	const [selectedCompany, setSelectedCompany] = useState("");
	const [companyData, setCompanyData] = useState({});
	const [chartData, setChartData] = useState([]);

	const fetchDataForCompany = async (company) => {
		console.log(`Fetching table data for company: ${company}`);
		try {
			company = company.split("-")[0].trim();

			const response = await fetch(
				`https://financialmodelingprep.com/api/v3/profile/${company}?apikey=9ea462a62531d93aa2be881a058c3951`
			);
			const companyData = await response.json();

			console.log(companyData);

			// Ensure data is in the form of an object
			return companyData[0] || {}; // Assuming the API returns an array with one object
		} catch (error) {
			console.error("Error fetching company data:", error);
		}
	};

	const fetchDataForChart = async (company) => {
		console.log(`Fetching graph data for company: ${company}`);
		try {
			company = company.split("-")[0].trim();

			const response = await fetch(
				`https://fmpcloud.io/api/v3/historical-price-full/${company}?serietype=line&apikey=9ea462a62531d93aa2be881a058c3951`
			);
			const chartData = await response.json();

			console.log(chartData.historical);

			chartData.historical.sort((a, b) => {
				const labelA = a.date.toLowerCase();
				const labelB = b.date.toLowerCase();
				if (labelA < labelB) return -1;
				if (labelA > labelB) return 1;
				return 0;
			});

			return chartData.historical;
		} catch (error) {
			console.error("Error fetching graph data:", error);
		}
	};

	useEffect(() => {
		if (selectedCompany) {
			fetchDataForCompany(selectedCompany).then((data) => {
				console.log("API call finished.", data);
				setCompanyData(data);
			});
			fetchDataForChart(selectedCompany).then((data) => {
				console.log("API call finished.", data);
				setChartData(data);
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

					alignItems: "center",
					flexDirection: {
						xs: "column",
						sm: "row",
					},
					gap: "10px",
					width: "100%",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: "10px",
						width: "100%",
					}}
				>
					<Typography component={"span"} variant={"h2"}>
						Finance App
					</Typography>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "10px",
						width: {
							xs: "75%",
							sm: "100%",
						},
					}}
				>
					<Searchbar
						setSelectedCompany={setSelectedCompany}
						selectedCompany={selectedCompany}
					/>
				</Box>
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
						component={"span"}
						variant={"h4"}
						sx={{
							mb: 4,
						}}
					>
						{selectedCompany}
					</Typography>
					<TabComponent
						companyData={companyData}
						chartData={chartData}
					/>
				</Box>
			)}
		</Container>
	);
};

export default App;
