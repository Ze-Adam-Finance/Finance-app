import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab } from "@mui/material";
import CompanyProfileCard from "./CompanyProfileCard";
import RevenueChart from "./RevenueChart";

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

const TabsComponent = ({ companyData, chartData }) => {
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
				<CompanyProfileCard data={companyData} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<RevenueChart data={chartData} />
			</TabPanel>
		</Box>
	);
};

TabsComponent.propTypes = {
	companyData: PropTypes.object.isRequired,
	chartData: PropTypes.array.isRequired,
};

export default TabsComponent;
