"use client";

import { useId } from "react";

import { Textarea } from "@/components/ui/textarea";

import { ControlField } from "./ControlField";

interface TextareaControlProps {
  label: string;
  value: string;
  onChange(value: string): void;
  rows?: number;
  placeholder?: string;
  hint?: string;
}

export function TextareaControl({ label, value, onChange, rows = 3, placeholder, hint }: TextareaControlProps) {
  const id = useId();

  return (
    <ControlField id={id} label={label} hint={hint}>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </ControlField>
  );
}
