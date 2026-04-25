import { cn } from '@/lib/utils';

export function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'emphasis' | 'success' | 'muted';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        variant === 'default' && 'border-white/10 bg-black/30 text-zinc-100',
        variant === 'emphasis' &&
          'border-bronze-200/30 bg-bronze-200/10 text-bronze-100',
        variant === 'success' && 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
        variant === 'muted' && 'border-white/10 bg-white/5 text-zinc-300/80',
      )}
    >
      {children}
    </span>
  );
}

