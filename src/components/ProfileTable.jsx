import PropTypes from "prop-types";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const ProfileTable = ({ data }) => (
	<TableContainer component={Paper}>
		<Table>
			<TableHead>
				<TableRow></TableRow>
			</TableHead>
			<TableBody>
				{data.map((item, index) => (
					<TableRow key={index}>
						<TableCell sx={{ fontWeight: "bold" }}>
							{item.label}
						</TableCell>
						<TableCell>
							{" "}
							{item.value !== undefined &&
							item.value !== null &&
							item.value !== ""
								? item.value
								: "-"}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

ProfileTable.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
		})
	).isRequired,
};

export default ProfileTable;
