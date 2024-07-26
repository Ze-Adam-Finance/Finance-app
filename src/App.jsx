import Searchbar from "./components/Searchbar";
import { useState, useEffect } from "react";
import { Container, Box, Divider, Typography } from "@mui/material";
import TabComponent from "./components/TabComponent";
import { getFullCompanyData } from "./api/getFullCompanyData";

const App = () => {
	const [selectedCompany, setSelectedCompany] = useState("");
	const [companyData, setCompanyData] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [incomeStatementData, setIncomeStatementData] = useState([]);



	useEffect(() => {
		if (selectedCompany) {
			getFullCompanyData(selectedCompany).then((data) => {
				console.log("API call finished.", data);
				setCompanyData(data.companyData);
				setChartData(data.chartData);
				setIncomeStatementData(data.incomeStatementData);
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
				<Typography component={'span'} variant={"h2"}>Finance App</Typography>
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
						component={'span'}
						variant={"h4"}
						sx={{
							mb: 4,
						}}
					>
						{selectedCompany}
					</Typography>
					<TabComponent companyData={companyData} chartData={chartData} incomeStatementData={incomeStatementData} />
				</Box>
			)}
		</Container>
	);
};

export default App;
