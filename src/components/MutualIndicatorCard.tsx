import { PieChart, Pie, Cell } from 'recharts';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface MutualIndicatorCardProps {
  title: string;
  value: number | string;
  unit: string;
  badgeLabel: string;
  regulation: string;
  percentage: number;
  chartLabel: string | React.ReactNode;
  color?: string;
  secondaryColor?: string;
}

const MutualIndicatorCard: React.FC<MutualIndicatorCardProps> = ({
  title,
  value,
  unit,
  badgeLabel,
  regulation,
  percentage,
  chartLabel,
  color = '#0d7c7c',
  secondaryColor = '#e2e8f0',
}) => {
  const data = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: Math.max(0, 100 - percentage) },
  ];

  const COLORS = [color, secondaryColor];

  return (
    <Card className="indicator-card relative overflow-hidden border-[#f1f5f9] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Background decorative shape */}
      <div 
        className="absolute -top-[60px] -right-[60px] h-[220px] w-[220px] rounded-full opacity-10" 
        style={{ backgroundColor: color }} 
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="max-w-[170px] text-[0.8rem] font-bold uppercase leading-tight tracking-[0.5px] text-[#64748b]">
            {title}
          </h2>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[3rem] font-extrabold leading-none text-[#1a2b3c]">{value}</span>
            <span className="text-[1.1rem] font-medium text-[#94a3b8]">{unit}</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline"
              className="rounded-full border-none font-extrabold py-1.5 px-3 text-[0.7rem]"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              {badgeLabel}
            </Badge>
            <span className="text-[0.85rem] font-semibold text-[#94a3b8]">{regulation}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-[120px] w-[120px] items-center justify-center">
            <PieChart width={120} height={120}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={400}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[1.5rem] font-extrabold leading-none" style={{ color: color }}>
                {percentage}%
              </span>
            </div>
          </div>
          <p className="text-center text-[0.8rem] font-bold leading-tight text-[#94a3b8]">
            {chartLabel}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MutualIndicatorCard;
