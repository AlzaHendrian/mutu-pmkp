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
    <Card
      className="indicator-card relative overflow-hidden border-0 bg-white/80 p-6 shadow-none transition-all hover:-translate-y-1.5"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: `0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.8) inset`,
        borderRadius: '20px',
      }}
    >
      {/* Decorative gradient circle */}
      <div
        className="absolute -top-[70px] -right-[70px] h-[220px] w-[220px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}22 0%, ${color}08 60%, transparent 80%)`,
        }}
      />
      {/* Bottom left subtle accent */}
      <div
        className="absolute bottom-0 left-0 h-[80px] w-[80px] rounded-tr-full opacity-30"
        style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h2
            className="max-w-[170px] text-[0.72rem] font-bold uppercase leading-tight tracking-[0.8px]"
            style={{ color: '#94a3b8' }}
          >
            {title}
          </h2>

          {/* Value */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-extrabold leading-none"
              style={{ fontSize: '2.75rem', letterSpacing: '-2px', color: '#1e2235' }}
            >
              {value}
            </span>
            <span className="text-[1rem] font-medium text-slate-400">{unit}</span>
          </div>

          {/* Badge + Regulation */}
          <div className="flex items-center gap-2.5">
            <Badge
              variant="outline"
              className="rounded-full border-none font-bold py-1 px-3 text-[0.65rem] tracking-wide"
              style={{
                backgroundColor: `${color}18`,
                color: color,
                letterSpacing: '0.5px',
              }}
            >
              {badgeLabel}
            </Badge>
            <span className="text-[0.75rem] font-500 text-slate-400">{regulation}</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative flex h-[118px] w-[118px] items-center justify-center">
            {/* Soft glow ring */}
            <div
              className="absolute inset-1 rounded-full"
              style={{
                boxShadow: `0 0 20px ${color}25, 0 0 40px ${color}10`,
              }}
            />
            <PieChart width={118} height={118}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="68%"
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
              <span
                className="font-extrabold leading-none"
                style={{ fontSize: '1.4rem', color: color, letterSpacing: '-1px' }}
              >
                {percentage}%
              </span>
            </div>
          </div>
          <p className="text-center text-[0.72rem] font-semibold leading-tight text-slate-400">
            {chartLabel}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MutualIndicatorCard;
