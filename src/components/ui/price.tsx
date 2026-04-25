import { cn } from '@/lib/utils';
import { formatMoney } from '@/lib/format';

export function Price({ cents, className }: { cents: number; className?: string }) {
  return <span className={cn('font-semibold', className)}>{formatMoney(cents)}</span>;
}

