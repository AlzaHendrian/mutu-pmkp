import React, { useState } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';
import type { DashboardState } from '../stores/dashboardStore';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Button } from './ui/button';
import { Lock, Unlock } from 'lucide-react';
import { cn } from '../lib/utils';

// Dummy master data
const masterUnits = [
  { id: 1, name: 'IGD' },
  { id: 2, name: 'Farmasi' },
  { id: 3, name: 'Laboratorium' },
  { id: 4, name: 'Radiologi' },
];

const masterPeriode = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const masterRange = [
  { id: 'Q1', name: 'Quarter 1 (Jan-Mar)' },
  { id: 'Q2', name: 'Quarter 2 (Apr-Jun)' },
  { id: 'Q3', name: 'Quarter 3 (Jul-Sep)' },
  { id: 'Q4', name: 'Quarter 4 (Okt-Des)' },
];

const masterTahun = ['2023', '2024', '2025', '2026'];

const Filter: React.FC = () => {
  const [unit, setUnit] = useState<string>('');
  const [filterType, setFilterType] = useState<'Periode' | 'Range' | ''>('');
  const [year, setYear] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  
  const isUnlocked = useDashboardStore((state: DashboardState) => state.isUnlocked);
  const unlock = useDashboardStore((state: DashboardState) => state.unlock);
  const lock = useDashboardStore((state: DashboardState) => state.lock);

  const isInputInvalid = !unit || !filterType || !year || !filterValue;

  const handleToggle = () => {
    if (isUnlocked) {
      lock();
    } else {
      unlock();
    }
  };

  return (
    <div className="flex w-full justify-end">
      <div className="flex items-center gap-2 rounded-xl border bg-white/50 p-1.5 shadow-sm">
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger className="w-[140px] border-none bg-transparent shadow-none hover:bg-accent focus:ring-0">
            <SelectValue placeholder="Pilih Unit" />
          </SelectTrigger>
          <SelectContent>
            {masterUnits.map(u => (
              <SelectItem key={u.id} value={u.name}>{u.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filterType} 
          onValueChange={(val) => {
            setFilterType(val as 'Periode' | 'Range' | '');
            setYear('');
            setFilterValue(''); 
          }}
        >
          <SelectTrigger className="w-[120px] border-none bg-transparent shadow-none hover:bg-accent focus:ring-0">
            <SelectValue placeholder="Pilih Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Periode">Periode</SelectItem>
            <SelectItem value="Range">Range</SelectItem>
          </SelectContent>
        </Select>

        {filterType && (
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px] border-none bg-transparent shadow-none hover:bg-accent focus:ring-0">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {masterTahun.map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filterType === 'Periode' && (
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[140px] border-none bg-transparent shadow-none hover:bg-accent focus:ring-0">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              {masterPeriode.map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filterType === 'Range' && (
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[160px] border-none bg-transparent shadow-none hover:bg-accent focus:ring-0">
              <SelectValue placeholder="Pilih Quarter" />
            </SelectTrigger>
            <SelectContent>
              {masterRange.map(q => (
                <SelectItem key={q.id} value={q.name}>{q.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button 
          variant={isUnlocked ? "secondary" : "default"}
          size="sm"
          className={cn(
            "h-9 gap-2 font-bold shadow-md",
            !isUnlocked && "bg-primary text-white hover:bg-primary/90 shadow-[0_4px_12px_rgba(124,58,237,0.25)]",
            isUnlocked && "bg-slate-500 hover:bg-slate-600 text-white"
          )}
          disabled={!isUnlocked && isInputInvalid}
          onClick={handleToggle}
        >
          {isUnlocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          {isUnlocked ? 'Tutup Kunci' : 'Buka Kunci'}
        </Button>
      </div>
    </div>
  );
};

export default Filter;
