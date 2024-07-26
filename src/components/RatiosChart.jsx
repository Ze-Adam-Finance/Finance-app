import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import "./components.css"

const RatiosChart = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState('priceEarningsRatio'); // Initialize with 'revenue'

  // Handle button click to change the displayed column
  const handleColumnChange = (column) => {
    setSelectedColumn(column);
  };

  return (
    <div>
      <AreaChart
        key={selectedColumn} // Force remount on selected column change
        width={500}
        height={300}
        data={data}
        animationDuration={500}
        animationEasing="ease-out"
      >
        <YAxis type="number" tickFormatter={(value) => value.toFixed(2)}/>
        <XAxis dataKey="calendarYear" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Area type="monotone" dataKey={selectedColumn} stroke="#8884d8" fill="#8884d8" />
        <Tooltip />
      </AreaChart>

      {/* Styled buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginLeft: '10%'  }}>
        <button class="ratioButton" onClick={() => handleColumnChange('priceEarningsRatio')} >PE</button>
        <button class="ratioButton" onClick={() => handleColumnChange('priceToBookRatio')} >PB</button>
        <button class="ratioButton" onClick={() => handleColumnChange('priceToSalesRatio')} >PS</button>
        <button class="ratioButton" onClick={() => handleColumnChange('priceEarningsToGrowthRatio')} >PEG</button>
        <button class="ratioButton" onClick={() => handleColumnChange('debtEquityRatio')} >Debt/Equity</button>
      </div>
    </div>
  );
};

export default RatiosChart;

