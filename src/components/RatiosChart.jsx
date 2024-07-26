import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from '@mui/material';
import "./components.css";

const RatiosChart = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState('priceEarningsRatio');
  const isTabletOrBelow = useMediaQuery('(max-width: 768px)');

  const handleColumnChange = (column) => {
    setSelectedColumn(column);
  };

  return (
    <div style={{ width: isTabletOrBelow ? '100%' : 500, height: 286 }}>
      <ResponsiveContainer width={isTabletOrBelow ? '100%' : 500} height={250}>
        <AreaChart
          key={selectedColumn}
          data={data}
          animationDuration={500}
          width={500}
          height={250}
          animationEasing="ease-out"
        >
          <YAxis type="number" tickFormatter={(value) => value.toFixed(2)}/>
          <XAxis dataKey="calendarYear" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Area type="monotone" dataKey={selectedColumn} stroke="#8884d8" fill="#8884d8" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginLeft: '10%'  }}>
        <button className="ratioButton" onClick={() => handleColumnChange('priceEarningsRatio')}>PE</button>
        <button className="ratioButton" onClick={() => handleColumnChange('priceToBookRatio')}>PB</button>
        <button className="ratioButton" onClick={() => handleColumnChange('priceToSalesRatio')}>PS</button>
        <button className="ratioButton" onClick={() => handleColumnChange('priceEarningsToGrowthRatio')}>PEG</button>
        <button className="ratioButton" onClick={() => handleColumnChange('debtEquityRatio')}>Debt/Equity</button>
      </div>
    </div>
  );
};

export default RatiosChart;