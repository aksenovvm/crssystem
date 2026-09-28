"use client";

import { useId } from "react";

import { Input } from "@/components/ui/input";

import { ControlField } from "./ControlField";

interface TextControlProps {
  label: string;
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  hint?: string;
}

export function TextControl({ label, value, onChange, placeholder, hint }: TextControlProps) {
  const id = useId();

  return (
    <ControlField id={id} label={label} hint={hint}>
      <Input id={id} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </ControlField>
  );
}
