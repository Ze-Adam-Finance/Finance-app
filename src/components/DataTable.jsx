import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function DataTable({ data }) {
	console.log(data);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Company Name</StyledTableCell>
						<StyledTableCell align="right">
							Exchange
						</StyledTableCell>
						<StyledTableCell align="right">Price</StyledTableCell>
						<StyledTableCell align="right">
							Market Cap
						</StyledTableCell>
						<StyledTableCell align="right">
							Employees
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.length > 0 ? (
						data.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component="th" scope="row">
									{row.companyName}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.exchangeShortName}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.price}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.mktCap}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.fullTimeEmployees}
								</StyledTableCell>
							</StyledTableRow>
						))
					) : (
						<StyledTableRow>
							<StyledTableCell colSpan={5} align="center">
								No data available
							</StyledTableCell>
						</StyledTableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

DataTable.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			symbol: PropTypes.string,
			price: PropTypes.number,
			beta: PropTypes.number,
			volAvg: PropTypes.number,
			mktCap: PropTypes.number,
			lastDiv: PropTypes.number,
			range: PropTypes.string,
			changes: PropTypes.number,
			companyName: PropTypes.string,
			currency: PropTypes.string,
			cik: PropTypes.string,
			isin: PropTypes.string,
			cusip: PropTypes.string,
			exchange: PropTypes.string,
			exchangeShortName: PropTypes.string,
			industry: PropTypes.string,
			website: PropTypes.string,
			description: PropTypes.string,
			ceo: PropTypes.string,
			sector: PropTypes.string,
			country: PropTypes.string,
			fullTimeEmployees: PropTypes.string,
			phone: PropTypes.string,
			address: PropTypes.string,
			city: PropTypes.string,
			state: PropTypes.string,
			zip: PropTypes.string,
			dcfDiff: PropTypes.number,
			dcf: PropTypes.number,
			image: PropTypes.string,
			ipoDate: PropTypes.string,
			defaultImage: PropTypes.bool,
			isEtf: PropTypes.bool,
			isActivelyTrading: PropTypes.bool,
			isAdr: PropTypes.bool,
			isFund: PropTypes.bool,
		})
	).isRequired,
};

export default DataTable;
