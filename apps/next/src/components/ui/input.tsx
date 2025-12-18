import * as React from "react";

import { cn } from "@/lib/utils/index";

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function Input({ className, type, icon: Icon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="text-input-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-input-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input bg-input/30 h-12 w-full min-w-0 rounded-xl border py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          Icon ? "pr-3 pl-10" : "px-3",
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
