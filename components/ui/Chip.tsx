import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  color?: string; // Tailwind color class e.g. "text-blue-400"
  className?: string;
}

export function Chip({ label, color = 'text-gray-400', className }: ChipProps) {
  return (
    <span className={cn('px-2 py-1 rounded-full bg-white/10 text-sm', color, className)}>
      {label}
    </span>
  );
}
