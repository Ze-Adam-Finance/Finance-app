import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

function PriceChart({ data }) {
	return (
		<div style={{ width: "100%", height: 250 }}>
			<ResponsiveContainer width="100%" height="100%" minHeight={250}>
				<LineChart
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="close"
						stroke="#8884d8"
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

PriceChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			close: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default PriceChart;
