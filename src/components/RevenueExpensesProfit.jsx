import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




function StackedAreaChart({ data }) {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value, payload: { calendarYear, fullCosts, netIncome } } = payload[0];
    
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', padding: '8px', borderRadius: '4px' }}>
                    <div>Revenue: {value/1000000}M</div>
                    <div>Year: {calendarYear}</div>
                    <div>Full Costs: {fullCosts/1000000}M</div>
                    <div>Net Profit: {netIncome/1000000}M</div>
                </div>
            );
        }
        return null;
    };
    return (
        <div style={{ width: 500, height: 250 }}>
            <ResponsiveContainer width={500} height={250}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="calendarYear"/>
                <YAxis 
                    tickFormatter={(value) => {
                        if (value > 1000000 || value < 1000000) {
                            return `${(value / 1000000).toFixed(1)}M`;
                        } else if(value > 1000 || value < 1000) {
                            return `${(value / 1000).toFixed(1)}K`;
                        } else {return value;}
                    }}
                />
                <Tooltip content={<CustomTooltip />} /> {/* Use the custom tooltip */}
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="fullCosts" stroke="#FF7F7F" fill="#FF7F7F" />
                <Area type="monotone" dataKey="netIncome" stroke="#07911e" fill="#07911e" />
                {/* Add more Area components for additional lines */}
            </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StackedAreaChart; //test