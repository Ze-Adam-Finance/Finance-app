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
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Column One</StyledTableCell>
						<StyledTableCell align="right">
							Column Two
						</StyledTableCell>
						<StyledTableCell align="right">
							Column Three
						</StyledTableCell>
						<StyledTableCell align="right">
							Column Four
						</StyledTableCell>
						<StyledTableCell align="right">
							Column Five
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.length > 0 ? (
						data.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component="th" scope="row">
									{row.name}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.calories}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.fat}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.carbs}
								</StyledTableCell>
								<StyledTableCell align="right">
									{row.protein}
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
			name: PropTypes.string,
			calories: PropTypes.number,
			fat: PropTypes.number,
			carbs: PropTypes.number,
			protein: PropTypes.number,
		})
	).isRequired,
};

export default DataTable;
