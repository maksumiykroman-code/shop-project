import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  className,
  variant = 'primary',
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition',
        variant === 'primary' &&
          'bg-bronze-400 text-zinc-950 hover:bg-bronze-300 disabled:bg-bronze-400/40 disabled:text-zinc-300',
        variant === 'secondary' &&
          'border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 disabled:opacity-50',
        variant === 'ghost' &&
          'text-zinc-200/80 hover:text-white hover:bg-white/5 disabled:opacity-50',
        'disabled:cursor-not-allowed',
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  className,
  variant = 'primary',
  disabled,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  variant?: Variant;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium',
          'bg-white/5 text-zinc-300/70 border border-white/10 cursor-not-allowed',
          className,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition',
        variant === 'primary' && 'bg-bronze-400 text-zinc-950 hover:bg-bronze-300',
        variant === 'secondary' &&
          'border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10',
        variant === 'ghost' && 'text-zinc-200/80 hover:text-white hover:bg-white/5',
        className,
      )}
    >
      {children}
    </Link>
  );
}

