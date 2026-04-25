import { cn } from '@/lib/utils';

export function Textarea({
  label,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block space-y-1">
      {label ? (
        <span className="text-xs font-medium text-zinc-300/80">{label}</span>
      ) : null}
      <textarea
        className={cn(
          'w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100',
          'placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-bronze-200/30',
          className,
        )}
        {...props}
      />
    </label>
  );
}

