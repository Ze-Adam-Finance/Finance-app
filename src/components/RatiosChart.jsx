import React, { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@mui/material";
import "./components.css";

const RatiosChart = ({ data }) => {
    const [selectedColumn, setSelectedColumn] = useState("priceEarningsRatio");
    const isTabletOrBelow = useMediaQuery("(max-width: 768px)");

    const handleColumnChange = (column) => {
        setSelectedColumn(column);
    };

    return (
        <ResponsiveContainer width={"100%"} height={250}>
            <AreaChart
                key={selectedColumn}
                data={data}
                animationDuration={500}
                width={500}
                height={250}
                animationEasing="ease-out"
            >
                <YAxis
                    type="number"
                    tickFormatter={(value) => value.toFixed(2)} // Limit Y-axis ticks to 2 decimals
                />
                <XAxis dataKey="calendarYear" />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Area
                    type="monotone"
                    dataKey={selectedColumn}
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                <Tooltip formatter={(value) => value.toFixed(2)} /> {/* Limit tooltip values to 2 decimals */}
            </AreaChart>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginLeft: "10%",
                }}
            >
                <button
                    className="ratioButton"
                    onClick={() => handleColumnChange("priceEarningsRatio")}
                >
                    PE
                </button>
                <button
                    className="ratioButton"
                    onClick={() => handleColumnChange("priceToBookRatio")}
                >
                    PB
                </button>
                <button
                    className="ratioButton"
                    onClick={() => handleColumnChange("priceToSalesRatio")}
                >
                    PS
                </button>
                <button
                    className="ratioButton"
                    onClick={() =>
                        handleColumnChange("priceEarningsToGrowthRatio")
                    }
                >
                    PEG
                </button>
                <button
                    className="ratioButton"
                    onClick={() => handleColumnChange("debtEquityRatio")}
                >
                    Debt/Equity
                </button>
            </div>
        </ResponsiveContainer>
    );
};

export default RatiosChart;