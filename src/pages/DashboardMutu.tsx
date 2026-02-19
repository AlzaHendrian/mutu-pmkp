import React from 'react';
import MutualIndicatorCard from '../components/MutualIndicatorCard';
import Header from '../components/Header';
import { useDashboardStore } from '../stores/dashboardStore';
import { Badge } from '../components/ui/badge';
import type { DashboardState } from '../stores/dashboardStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const trenData = [
  { name: 'Jan', 'IGD': 85, 'Farmasi': 90, 'Laborat': 75, 'Radiologi': 80, 'Gizi': 95, 'Kesling': 70 },
  { name: 'Feb', 'IGD': 88, 'Farmasi': 85, 'Laborat': 80 },
  { name: 'Mar', 'IGD': 92, 'Farmasi': 88, 'Laborat': 85, 'Radiologi': 82 },
  { name: 'Apr', 'IGD': 90, 'Farmasi': 95, 'Laborat': 88, 'Radiologi': 85, 'Gizi': 90 },
  { name: 'Mei', 'IGD': 85, 'Farmasi': 92 },
  { name: 'Jun', 'IGD': 95, 'Farmasi': 90, 'Laborat': 80, 'Radiologi': 88 },
  { name: 'Jul', 'IGD': 88, 'Farmasi': 85, 'Laborat': 90, 'Radiologi': 92, 'Gizi': 85, 'Kesling': 88 },
  { name: 'Agu', 'IGD': 92, 'Farmasi': 88, 'Laborat': 85 },
  { name: 'Sep', 'IGD': 90, 'Farmasi': 95, 'Laborat': 90, 'Radiologi': 88 },
  { name: 'Okt', 'IGD': 85, 'Farmasi': 92, 'Laborat': 95, 'Radiologi': 85, 'Gizi': 92, 'Kesling': 90 },
  { name: 'Nov', 'IGD': 95, 'Farmasi': 90, 'Laborat': 92 },
  { name: 'Des', 'IGD': 98, 'Farmasi': 95, 'Laborat': 90, 'Radiologi': 92, 'Gizi': 98, 'Kesling': 95 }
];

const unitConfig = [
  { key: 'IGD', color: '#4338ca' },
  { key: 'Farmasi', color: '#4f46e5' },
  { key: 'Laborat', color: '#6366f1' },
  { key: 'Radiologi', color: '#6d28d9' },
  { key: 'Gizi', color: '#7c3aed' },
  { key: 'Kesling', color: '#8b5cf6' }
];


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const MonitoringTable: React.FC = () => {
  interface MonitoringRow {
    no: number;
    unit: string;
    jml: number;
    progress: number;
    status: 'PROSES' | 'LENGKAP';
    color: string;
  }

  const data: MonitoringRow[] = [
    { no: 1, unit: 'IGD', jml: 10, progress: 9, status: 'PROSES', color: '#3b82f6' },
    { no: 2, unit: 'Farmasi', jml: 6, progress: 6, status: 'LENGKAP', color: '#10b981' },
    { no: 3, unit: 'Ruang Bersalin', jml: 13, progress: 12, status: 'PROSES', color: '#3b82f6' },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b">
          <TableHead className="w-12">No</TableHead>
          <TableHead>Unit Kerja</TableHead>
          <TableHead>Jml Indikator</TableHead>
          <TableHead className="w-[200px]">Progress Input</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.no} className="group transition-colors hover:bg-slate-50">
            <TableCell className="font-medium">{row.no}</TableCell>
            <TableCell className="group-hover:text-primary transition-colors">{row.unit}</TableCell>
            <TableCell>{row.jml}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(row.progress / row.jml) * 100}%`,
                      backgroundColor: row.color 
                    }}
                  />
                </div>
                <span className="text-[0.75rem] font-bold text-slate-500 min-w-[35px]">
                  {row.progress}/{row.jml}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant="outline"
                className="rounded text-[0.65rem] font-extrabold uppercase py-0.5"
                style={{ 
                  backgroundColor: `${row.color}15`, 
                  color: row.color,
                  borderColor: 'transparent'
                }}
              >
                {row.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <a href="#" className="text-[0.8rem] font-bold text-primary hover:underline">
                {row.status === 'LENGKAP' ? 'Detail' : 'Ingat kan 🔔'}
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: { [key: string]: number | string };
    color?: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <div className="tooltip-details" style={{ fontSize: '12px' }}>
          {payload.map((entry, index) => (
            <div key={index} style={{ color: entry.color, padding: '2px 0', display: 'flex', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>{entry.name}:</span>
              <span>{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const DashboardMutu: React.FC = () => {
  const isUnlocked = useDashboardStore((state: DashboardState) => state.isUnlocked);

  return (
    <div className="main-content">
      <Header 
        title="Dashboard Mutu" 
        subtitle="Monitoring Capaian Indikator Mutu RS" 
      />

      {!isUnlocked ? (
        <div className="locked-container">
          <div className="lock-box">
            <div className="lock-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17V15M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="lock-alert-badge">!</div>
            </div>
            <p className="lock-message">SILAHKAN PILIH PERUSAHAAN DAN TAHUN PERIODE TERLEBIH DAHULU !</p>
          </div>
        </div>
      ) : (
        <>
          <div className="cards-grid">
        <MutualIndicatorCard
          title="INDIKATOR NASIONAL MUTU"
          value={13}
          unit="Indikator"
          badgeLabel="WAJIB"
          regulation="Permenkes 30/2022"
          percentage={90}
          chartLabel={<>Kelengkapan<br />Input</>}
          color="#0d9488"
        />
        <MutualIndicatorCard
          title="PRIORITAS RS (IMP-RS)"
          value={10}
          unit="Indikator"
          badgeLabel="PRIORITAS"
          regulation="SK Direktur"
          percentage={70}
          chartLabel={<>Kelengkapan<br />Input</>}
          color="#8b5cf6"
        />
        <MutualIndicatorCard
          title="MUTU UNIT (IMP-UNIT)"
          value={55}
          unit="Indikator"
          badgeLabel="UNIT KERJA"
          regulation="Kamus Indikator"
          percentage={20}
          chartLabel={<>Kelengkapan<br />Input</>}
          color="#f59e0b"
        />
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <h3>Tren Kepatuhan Mutu (6 Bulan Terakhir)</h3>
          <div className="chart-tabs">
            <span className="tab active">INM</span>
          </div>
        </div>
        <div style={{ width: '100%', height: 380 }}>
          <ResponsiveContainer>
            <BarChart data={trenData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} barGap={8}>
              <defs>
                {unitConfig.map((unit) => (
                  <linearGradient key={`grad-${unit.key}`} id={`gradient-${unit.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={unit.color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={unit.color} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                unit="%"
                dx={-10}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                shared={false}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                wrapperStyle={{ paddingBottom: '30px', fontSize: '13px', fontWeight: 600 }}
              />
              {unitConfig.map((unit) => (
                <Bar 
                  key={unit.key}
                  name={unit.key}
                  dataKey={unit.key} 
                  fill={`url(#gradient-${unit.key})`} 
                  radius={0} /* Sharp corners */
                  barSize={14}
                  animationDuration={1500}
                  animationBegin={200}
                  activeBar={{ 
                    stroke: '#fff', 
                    strokeWidth: 2,
                    fillOpacity: 1
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <h3>Monitoring Kepatuhan Input (Februari 2026)</h3>
        </div>
        <MonitoringTable />
      </div>
    </>
  )}
</div>
);
};

export default DashboardMutu;
