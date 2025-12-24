import * as React from "react";

import { cn } from "@/lib/utils/index";

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
};

function Input({
  className,
  type,
  icon: Icon,
  iconClassName,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon
          className={cn(
            "text-placeholder absolute top-1/2 left-3 size-3 -translate-y-1/2",
            iconClassName
          )}
        />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-placeholder selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input bg-input/30 h-12 w-full min-w-0 rounded-[calc(var(--radius)+2px)] border py-1 text-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          Icon ? "pr-3 pl-8" : "px-3",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
