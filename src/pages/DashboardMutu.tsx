import React from 'react';
import MutualIndicatorCard from '../components/MutualIndicatorCard';
import Header from '../components/Header';
import { useDashboardStore } from '../stores/dashboardStore';
import { Badge } from '../components/ui/badge';
import type { DashboardState } from '../stores/dashboardStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const trenData = [
  { name: 'Jan', 'IGD': 85, 'Farmasi': 90, 'Laborat': 75, 'Radiologi': 80, 'Gizi': 95, 'Kesling': 70 },
  { name: 'Feb', 'IGD': 88, 'Farmasi': 85, 'Laborat': 80, 'Radiologi': 82, 'Gizi': 88, 'Kesling': 75 },
  { name: 'Mar', 'IGD': 92, 'Farmasi': 88, 'Laborat': 85, 'Radiologi': 82, 'Gizi': 92, 'Kesling': 80 },
  { name: 'Apr', 'IGD': 90, 'Farmasi': 95, 'Laborat': 88, 'Radiologi': 85, 'Gizi': 90, 'Kesling': 85 },
  { name: 'Mei', 'IGD': 85, 'Farmasi': 92, 'Laborat': 80, 'Radiologi': 88, 'Gizi': 85, 'Kesling': 82 },
  { name: 'Jun', 'IGD': 95, 'Farmasi': 90, 'Laborat': 80, 'Radiologi': 88, 'Gizi': 95, 'Kesling': 88 },
  { name: 'Jul', 'IGD': 88, 'Farmasi': 85, 'Laborat': 90, 'Radiologi': 92, 'Gizi': 85, 'Kesling': 88 },
  { name: 'Agu', 'IGD': 92, 'Farmasi': 88, 'Laborat': 85, 'Radiologi': 82, 'Gizi': 90, 'Kesling': 85 },
  { name: 'Sep', 'IGD': 90, 'Farmasi': 95, 'Laborat': 90, 'Radiologi': 88, 'Gizi': 92, 'Kesling': 90 },
  { name: 'Okt', 'IGD': 85, 'Farmasi': 92, 'Laborat': 95, 'Radiologi': 85, 'Gizi': 92, 'Kesling': 90 },
  { name: 'Nov', 'IGD': 95, 'Farmasi': 90, 'Laborat': 92, 'Radiologi': 88, 'Gizi': 95, 'Kesling': 92 },
  { name: 'Des', 'IGD': 98, 'Farmasi': 95, 'Laborat': 90, 'Radiologi': 92, 'Gizi': 98, 'Kesling': 95 }
];

const unitConfig = [
  { key: 'IGD', color: '#4f46e5' },
  { key: 'Farmasi', color: '#10b981' },
  { key: 'Laborat', color: '#f59e0b' },
  { key: 'Radiologi', color: '#06b6d4' },
  { key: 'Gizi', color: '#f43f5e' },
  { key: 'Kesling', color: '#8b5cf6' }
];

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
      <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-4 min-w-[240px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex flex-col">
            <span className="text-slate-800 font-bold text-sm">{label} 2026</span>
            <span className="text-slate-400 text-[0.65rem] font-medium tracking-tight">Capaian Indikator Mutu</span>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded-lg border border-green-100/50">
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[0.65rem] font-bold">72%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[0.7rem] font-bold text-slate-600">{entry.name}</span>
              </div>
              <span className="text-[0.7rem] font-black text-slate-800">{entry.value}%</span>
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
  const [activeTab, setActiveTab] = React.useState('INM');

  return (
    <div className="flex-grow p-8 px-10 overflow-y-auto w-full min-h-screen bg-gradient-to-br from-[#f0f2f8] via-[#eef0f8] to-[#f3f0fb] flex flex-col">
      <Header 
        title="Dashboard Mutu" 
        subtitle="Monitoring Capaian Indikator Mutu RS" 
      />

      {!isUnlocked ? (
        <div className="flex justify-center items-center flex-1 w-[calc(100%+5rem)] mt-4 -mx-10 -mb-8 bg-white/40 backdrop-blur-md border-t border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-b-[30px]">
          <div className="text-center flex flex-col items-center gap-6 p-8">
            <div className="relative w-[72px] h-[72px] text-primary drop-shadow-[0_8px_20px_rgba(124,58,237,0.3)]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M12 17V15M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 bg-gradient-to-br from-[#f43f5e] to-[#e11d48] text-white w-[22px] h-[22px] rounded-full border-[3px] border-[#f0f2f8] flex items-center justify-center font-black text-[0.7rem] shadow-[0_2px_8px_rgba(244,63,94,0.4)]">!</div>
            </div>
            <p className="text-[0.9rem] font-bold text-slate-800 tracking-wider max-w-[320px] leading-relaxed">SILAHKAN PILIH PERUSAHAAN DAN TAHUN PERIODE TERLEBIH DAHULU !</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mb-7 w-full">
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

          <div className="bg-white/80 backdrop-blur-md rounded-[20px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] border border-slate-200/60 mb-6 transition-all hover:shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.07)]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Tren Kepatuhan Mutu (6 Bulan Terakhir)</h3>
              <div className="flex items-center bg-slate-100/80 border border-slate-200/60 p-1 rounded-xl">
                {['INM', 'IMP-RS', 'IMP-Unit'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                        : 'text-slate-500 hover:text-slate-700 border border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', height: 420 }} className="relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trenData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid 
                    strokeDasharray="4 6" 
                    vertical={false} 
                    horizontal={true} 
                    stroke="#e2e8f0" 
                    strokeOpacity={0.8}
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }} 
                    dy={20}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }}
                    unit="%"
                    domain={[0, 100]}
                    tickCount={6}
                  />
                  <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={{ stroke: '#4338ca', strokeWidth: 1.5, strokeDasharray: '0' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    align="center" 
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ paddingTop: '60px', fontSize: '13px', fontWeight: 700, color: '#475569' }}
                    formatter={(value) => <span className="text-slate-600 ml-1 mr-4">{value}</span>}
                  />
                  {unitConfig.map((unit) => (
                    <Line
                      key={unit.key}
                      name={unit.key}
                      type="monotone"
                      dataKey={unit.key}
                      stroke={unit.color}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: unit.color, strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: unit.color }}
                      animationDuration={1500}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[20px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] border border-slate-200/60 mb-6 transition-all hover:translate-y-[-1px] hover:shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.07)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[0.95rem] font-extrabold m-0 text-slate-800 tracking-tight">Monitoring Kepatuhan Input (Februari 2026)</h3>
            </div>
            <MonitoringTable />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardMutu;
