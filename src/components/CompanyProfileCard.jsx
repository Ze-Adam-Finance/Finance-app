import PropTypes from "prop-types";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Box,
} from "@mui/material";
import ProfileTable from "./ProfileTable";
import PriceChart from "./PriceChart";

const CompanyProfileCard = ({ companyData, chartData }) => {
	const {
		description = "",
		image,
		exchange,
		exchangeShortName,
		industry,
		sector,
		isActivelyTrading = false,
		ceo,
		fullTimeEmployees,
		currency,
		price,
		changes,
		range,
		lastDiv,
		mktCap,
		ipoDate,
	} = companyData;

	const leftTableData = [
		{
			label: "Exchange",
			value:
				exchange && exchangeShortName
					? `${exchange} (${exchangeShortName})`
					: "N/A",
		},
		{ label: "Industry", value: industry || "N/A" },
		{ label: "Sector", value: sector || "N/A" },
		{ label: "Actively Trading", value: isActivelyTrading ? "Yes" : "No" },
		{ label: "CEO", value: ceo || "N/A" },
		{ label: "Full-Time Employees", value: fullTimeEmployees || "N/A" },
	];

	const rightTableData = [
		{
			label: "Price",
			value: price && currency ? `${price} ${currency}` : "N/A",
		},
		{ label: "Changes", value: changes || "N/A" },
		{ label: "Range", value: range || "N/A" },
		{ label: "Last Dividend", value: lastDiv || "N/A" },
		{ label: "Market Cap", value: mktCap || "N/A" },
		{ label: "IPO Date", value: ipoDate || "N/A" },
	];

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.src =
			"https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
	};

	return (
		<Card>
			<CardContent>
				<Grid container spacing={0}>
					{/* Description and Image */}
					<Grid item xs={12} sm={8}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								minHeight: 150,
							}}
						>
							<Typography variant="body1" sx={{ mb: 2 }}>
								{description.split(".").slice(0, 3).join(".") +
									"."}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								minHeight: 150,
							}}
						>
							<CardMedia
								component="img"
								onError={handleImageError}
								image={image}
								alt="Company logo"
								sx={{
									width: "150px",
									height: "150px",
									objectFit: "cover",
								}}
							/>
						</Box>
					</Grid>
				</Grid>
				<Box>
					<PriceChart data={chartData} />
				</Box>
				<Grid container spacing={4} mt={1}>
					<Grid item xs={12} sm={6}>
						<ProfileTable data={leftTableData} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ProfileTable data={rightTableData} />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

CompanyProfileCard.propTypes = {
	companyData: PropTypes.object.isRequired,
	chartData: PropTypes.array.isRequired,
};

export default CompanyProfileCard;
