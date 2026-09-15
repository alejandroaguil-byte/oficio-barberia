import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-hairline bg-panel px-3.5 text-sm text-paper placeholder:text-stone/80",
        "transition-[border-color,box-shadow] duration-150 focus:border-stone focus:outline-none focus:ring-2 focus:ring-paper/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-hairline bg-panel px-3.5 py-3 text-sm text-paper placeholder:text-stone/80",
        "transition-[border-color,box-shadow] duration-150 focus:border-stone focus:outline-none focus:ring-2 focus:ring-paper/20",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-stone">
      {children}
    </label>
  );
}
