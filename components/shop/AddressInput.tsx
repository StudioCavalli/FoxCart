"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface AddressSuggestion {
  label: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: {
    address1: string;
    postalCode: string;
    city: string;
    country: string;
  }) => void;
  placeholder?: string;
  className?: string;
}

function AddressInput({ value, onChange, onSelect, placeholder, className }: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`/api/address-autocomplete?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.results ?? []);
        setOpen(true);
      }
    } catch {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(value), 300);
    return () => clearTimeout(timer);
  }, [value, search]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 border border-border bg-background shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => {
                onSelect({
                  address1: s.street,
                  postalCode: s.postalCode,
                  city: s.city,
                  country: s.country,
                });
                onChange(s.street);
                setOpen(false);
                setSuggestions([]);
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <div className="text-sm">{s.street}</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {s.postalCode} {s.city}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { AddressInput };
