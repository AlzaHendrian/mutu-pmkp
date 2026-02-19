import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDashboardStore } from '../stores/dashboardStore';
import type { DashboardState } from '../stores/dashboardStore';
import { Button } from './ui/button';
import { Lock, Unlock } from 'lucide-react';
import { cn } from '../lib/utils';
import { FloatingLabelSelect } from './base/FloatingLabelSelect/FloatingLabelSelect';
import type { SelectOption } from '@/types';

// Dummy master data
const masterUnits: SelectOption[] = [
  { value: 'IGD', label: 'IGD' },
  { value: 'Farmasi', label: 'Farmasi' },
  { value: 'Laboratorium', label: 'Laboratorium' },
  { value: 'Radiologi', label: 'Radiologi' },
];

const masterPeriode: SelectOption[] = [
  { value: 'Januari', label: 'Januari' },
  { value: 'Februari', label: 'Februari' },
  { value: 'Maret', label: 'Maret' },
  { value: 'April', label: 'April' },
  { value: 'Mei', label: 'Mei' },
  { value: 'Juni', label: 'Juni' },
  { value: 'Juli', label: 'Juli' },
  { value: 'Agustus', label: 'Agustus' },
  { value: 'September', label: 'September' },
  { value: 'Oktober', label: 'Oktober' },
  { value: 'November', label: 'November' },
  { value: 'Desember', label: 'Desember' },
];

const masterRange: SelectOption[] = [
  { value: 'Q1', label: 'Quarter 1 (Jan-Mar)' },
  { value: 'Q2', label: 'Quarter 2 (Apr-Jun)' },
  { value: 'Q3', label: 'Quarter 3 (Jul-Sep)' },
  { value: 'Q4', label: 'Quarter 4 (Okt-Des)' },
];

const masterTahun: SelectOption[] = [
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

interface FilterFormValues {
  unit: SelectOption | null;
  filterType: SelectOption | null;
  year: SelectOption | null;
  filterValue: SelectOption | null;
}

const Filter: React.FC = () => {
  const { control, watch, setValue, formState: { isValid } } = useForm<FilterFormValues>({
    defaultValues: {
      unit: null,
      filterType: null,
      year: null,
      filterValue: null,
    },
    mode: 'onChange'
  });

  const filterType = watch('filterType');

  // Reset dependent fields when filterType changes
  useEffect(() => {
    setValue('year', null);
    setValue('filterValue', null);
  }, [filterType, setValue]);
  
  const isUnlocked = useDashboardStore((state: DashboardState) => state.isUnlocked);
  const unlock = useDashboardStore((state: DashboardState) => state.unlock);
  const lock = useDashboardStore((state: DashboardState) => state.lock);

  const handleToggle = () => {
    if (isUnlocked) {
      lock();
    } else {
      unlock();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 rounded-2xl bg-transparent p-1 ring-1 ring-slate-200/40">
        <FloatingLabelSelect
          name="unit"
          control={control}
          label="Pilih Unit"
          options={masterUnits}
          containerClassName="w-full sm:w-[160px]"
          className="h-11 min-h-[44px] text-sm"
          rules={{ required: true }}
        />

        <FloatingLabelSelect
          name="filterType"
          control={control}
          label="Pilih Tipe"
          options={[
            { value: 'Periode', label: 'Periode' },
            { value: 'Range', label: 'Range' },
          ]}
          containerClassName="w-full sm:w-[140px]"
          className="h-11 min-h-[44px] text-sm"
          rules={{ required: true }}
        />

        {filterType?.value && (
          <FloatingLabelSelect
            name="year"
            control={control}
            label="Pilih Tahun"
            options={masterTahun}
            containerClassName="w-full sm:w-[130px]"
            className="h-11 min-h-[44px] text-sm"
            rules={{ required: true }}
          />
        )}

        {filterType?.value === 'Periode' && (
          <FloatingLabelSelect
            name="filterValue"
            control={control}
            label="Pilih Bulan"
            options={masterPeriode}
            containerClassName="w-full sm:w-[160px]"
            className="h-11 min-h-[44px] text-sm"
            rules={{ required: true }}
          />
        )}

        {filterType?.value === 'Range' && (
          <FloatingLabelSelect
            name="filterValue"
            control={control}
            label="Pilih Quarter"
            options={masterRange}
            containerClassName="w-full sm:w-[180px]"
            className="h-11 min-h-[44px] text-sm"
            rules={{ required: true }}
          />
        )}

        <Button 
          variant={isUnlocked ? "secondary" : "default"}
          size="sm"
          className={cn(
            "h-11 px-8 gap-2 font-bold shadow-lg transition-all rounded-xl ml-auto sm:ml-0",
            !isUnlocked && "bg-primary text-white hover:bg-primary/90 shadow-primary/20 hover:-translate-y-0.5",
            isUnlocked && "bg-slate-500 hover:bg-slate-600 text-white hover:bg-slate-700"
          )}
          disabled={!isUnlocked && !isValid}
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
