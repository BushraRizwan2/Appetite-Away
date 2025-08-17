import React from 'react';

const ChartPlaceholder: React.FC = () => {
    return (
        <div className="w-full h-64 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(244, 63, 94, 0.4)" />
                        <stop offset="100%" stopColor="rgba(244, 63, 94, 0)" />
                    </linearGradient>
                </defs>
                {/* Grid Lines */}
                <g className="text-slate-200 dark:text-slate-600">
                    <line x1="20" y1="10" x2="390" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="20" y1="50" x2="390" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="20" y1="90" x2="390" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="20" y1="130" x2="390" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="20" y1="170" x2="390" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                </g>
                {/* X-axis labels */}
                <g className="text-slate-400 text-[10px] fill-current">
                    <text x="30" y="190">Mon</text>
                    <text x="100" y="190">Tue</text>
                    <text x="170" y="190">Wed</text>
                    <text x="240" y="190">Thu</text>
                    <text x="310" y="190">Fri</text>
                    <text x="370" y="190">Sat</text>
                </g>
                 {/* Y-axis labels */}
                 <g className="text-slate-400 text-[10px] fill-current">
                    <text x="0" y="10">10k</text>
                    <text x="0" y="90">5k</text>
                    <text x="0" y="170">0</text>
                </g>
                {/* Data Line */}
                <polyline
                    fill="url(#gradient)"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    points="30,150 80,100 130,120 180,50 230,80 280,60 330,90 380,40"
                />
            </svg>
        </div>
    );
};

export default ChartPlaceholder;
