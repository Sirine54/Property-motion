import React from 'react'

type CustomCardProps = {
  isCamembert?: boolean;
  title: string;
  camPercentage?: number; 
  per_complete?: number; 
  per_remaining?: number;  
  className?: string;
  children?: React.ReactNode;
};

export const Donut = ({ percentage = 0 }: { percentage?: number }) => {
  const size = 100;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percentage / 100) * circumference;
  const dashOffset = circumference - dash;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={cx} cy={cy} r={radius} stroke="#27C499" strokeWidth={stroke} fill="transparent" />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="#151B38"
        strokeWidth={stroke}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 450ms cubic-bezier(.2,.9,.2,1)' }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm font-semibold"
        style={{ fontSize: 14, fill: '#0F172A' }}
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};

const LegendItem = ({ color, label }: { color: string; label: React.ReactNode }) => (
  <div className="flex items-center space-x-2 text-xs text-gray-600">
    <span className={`w-2 h-2 rounded-full`} style={{ background: color }} />
    <span>{label}</span>
  </div>
);

const CustomCard: React.FC<CustomCardProps> = ({
  isCamembert = false,
  title,
  camPercentage = 0,
  per_complete = 0,
  per_remaining = 0,
  className = '',
  children,
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 w-full  pb-8 ${className}`}>
      <div className="flex items-start justify-between pb-2 mb-8 border-b-[1.5px]  border-[#40405966] ">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <a
          className="text-xs text-teal-500  underline"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          View More
        </a>
      </div>

      {isCamembert ? (
        <div className="flex flex-col items-center">
          <Donut percentage={camPercentage}  />
          <div className="mt-8 w-full flex justify-between gap-6 px-10">
            <LegendItem color="#0F172A" label={`${per_complete}% Completed`} />
            <LegendItem color="#10B981" label={`${per_remaining}% Remaining`} />
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default CustomCard;
