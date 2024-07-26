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

const CompanyProfileCard = ({ data }) => {
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
	} = data;

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
		// e.target.style.display = 'none'
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
	data: PropTypes.shape({
		description: PropTypes.string,
		image: PropTypes.string,
		exchange: PropTypes.string,
		exchangeShortName: PropTypes.string,
		industry: PropTypes.string,
		sector: PropTypes.string,
		isActivelyTrading: PropTypes.bool,
		ceo: PropTypes.string,
		fullTimeEmployees: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		currency: PropTypes.string,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		changes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		range: PropTypes.string,
		lastDiv: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		mktCap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		ipoDate: PropTypes.string,
	}).isRequired,
};

export default CompanyProfileCard;
