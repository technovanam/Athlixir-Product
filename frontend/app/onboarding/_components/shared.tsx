import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 text-sm transition-colors";

// ---------------------------------------------------------------------------
// Custom fully-themed select — replaces native <select> so option highlight
// colour can be controlled (browser native options ignore CSS colour rules).
// ---------------------------------------------------------------------------
interface SelectOption { value: string; label: string }

interface StyledSelectProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function parseOptions(children: React.ReactNode): SelectOption[] {
  const options: SelectOption[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const el = child as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
    if (el.type === "option") {
      const val = el.props.value ?? "";
      const label = typeof el.props.children === "string" ? el.props.children : String(val);
      options.push({ value: String(val), label });
    }
  });
  return options;
}

export function StyledSelect({ value, onChange, children, disabled }: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = parseOptions(children);
  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function select(val: string) {
    onChange({ target: { value: val } });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between bg-[#0a0a0a] border ${
          open ? "border-[#FF5722] ring-1 ring-[#FF5722]/40" : "border-[#FF5722]/30"
        } rounded-xl px-4 py-2.5 text-sm text-white transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className={selected && selected.value !== "" ? "text-white" : "text-gray-500"}>
          {selected ? selected.label : "Select"}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#FF5722] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-[#0d0d0d] border border-[#FF5722]/30 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.7)] max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => select(opt.value)}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                opt.value === value
                  ? "bg-[#FF5722] text-white font-bold"
                  : "text-gray-300 hover:bg-[#FF5722]/20 hover:text-white"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
      {children}
    </label>
  );
}

export function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black/40 border border-white/10 rounded-4xl p-6">
      <h2 className="text-base font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
