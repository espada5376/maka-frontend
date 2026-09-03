import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({
  label,
  helperText,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-900"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          "h-12 w-full rounded-lg border bg-white px-4",
          "text-base text-slate-900 outline-none",
          "placeholder:text-slate-400",
          "transition-colors",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          error ? "border-red-500" : "border-slate-200",
          props.disabled
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "",
          className,
        ].join(" ")}
        {...props}
      />

      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
