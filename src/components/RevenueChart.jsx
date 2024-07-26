import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

function RevenueChart({ data }) {
	return (
		<div style={{ width: 500, height: 250 }}>
			<ResponsiveContainer width="100%" height="100%" minHeight={250}>
				<AreaChart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="close"
						stroke="#8884d8"
						fill="#8884d8"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default RevenueChart;
