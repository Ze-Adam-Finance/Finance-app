import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab } from "@mui/material";
import CompanyProfileCard from "./CompanyProfileCard";
import RevenueExpensesProfit from "./RevenueExpensesProfit";
import RatiosChart from "./RatiosChart";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

const TabsComponent = ({
	companyData,
	chartData,
	incomeStatementData,
	ratiosData,
}) => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="data and chart tabs"
				centered
			>
				<Tab label="Data Table" />
				<Tab label="Charts" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<CompanyProfileCard
					companyData={companyData}
					chartData={chartData}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
							gap: "10%",
							mt: "5%"
						}}
					>
						<Box sx={{ flex: 1 }}>
							<RevenueExpensesProfit data={incomeStatementData} />
						</Box>
						<Box sx={{ flex: 1 }}>
							<RatiosChart data={ratiosData} />
						</Box>
					</Box>
			</TabPanel>
		</Box>
	);
};

TabsComponent.propTypes = {
	companyData: PropTypes.object.isRequired,
	chartData: PropTypes.array.isRequired,
	incomeStatementData: PropTypes.array.isRequired,
	ratiosData: PropTypes.array.isRequired,
};

export default TabsComponent;
