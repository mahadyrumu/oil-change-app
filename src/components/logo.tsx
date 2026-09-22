import React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary dark:text-primary flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
        {/* Abstract Oil Drop */}
        <path d="M16 2.5C16 2.5 6 14.5 6 22C6 27.5228 10.4772 32 16 32C21.5228 32 26 27.5228 26 22C26 14.5 16 2.5 16 2.5Z" fill="currentColor" fillOpacity="0.2"/>
        <path d="M16 7C16 7 9 16 9 22C9 25.866 12.134 29 16 29C19.866 29 23 25.866 23 22C23 16 16 7 16 7Z" fill="currentColor"/>
        {/* Sleek Wrench / Tech Cutout */}
        <path d="M24 16L18 22C17.2 22.8 15.8 22.8 15 22C14.2 21.2 14.2 19.8 15 19L21 13L24 16Z" fill="var(--color-background)" style={{ fill: 'var(--background)' }} />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-foreground uppercase">
          Manhattan
        </span>
        <span className="text-[11px] font-bold tracking-widest text-secondary dark:text-primary uppercase leading-none mt-1">
          Oil Change
        </span>
      </div>
    </div>
  );
}
