import React from 'react';

interface ChartData {
  name: string;
  sales: number;
}

interface ChartProps {
  data: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const maxSales = Math.max(...data.map(d => d.sales));

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-2 h-32">
        {data.map((item, index) => {
          const height = (item.sales / maxSales) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${height}%` }}
                title={`${item.name}: ₹${item.sales}`}
              />
              <div className="text-xs text-gray-600 mt-2 text-center">{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-gray-500">
        Daily Sales Revenue (₹)
      </div>
    </div>
  );
};

export default Chart;