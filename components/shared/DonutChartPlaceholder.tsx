import React from 'react';

const DonutChartPlaceholder: React.FC = () => {
    const data = [
        { name: 'Completed', value: 70, color: '#10b981' }, // emerald-500
        { name: 'In Progress', value: 20, color: '#3b82f6' }, // blue-500
        { name: 'Cancelled', value: 10, color: '#ef4444' }, // red-500
    ];

    const cx = 50;
    const cy = 50;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="transparent"
                    stroke="#e5e7eb" // slate-200
                    strokeWidth="10"
                />
                {data.map((item, index) => {
                    const dashoffset = circumference - (accumulated / 100) * circumference;
                    const dasharray = (item.value / 100) * circumference;
                    accumulated += item.value;
                    return (
                        <circle
                            key={index}
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="10"
                            strokeDasharray={`${dasharray} ${circumference}`}
                            strokeDashoffset={dashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                    );
                })}
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">1.2k</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">Total Orders</span>
            </div>
        </div>
    );
};

export default DonutChartPlaceholder;
