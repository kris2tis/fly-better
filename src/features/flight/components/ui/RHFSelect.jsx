"use client";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

export default function RHFSelect({
  className = "",
  control,
  name,
  children,
  label,
  showedLabel,
  errors,
  onValueChange,
}) {
  const hasError = errors && errors[name];
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          dir="rtl"
          name={field.name}
          value={field.value}
          onValueChange={(value) => {
            if (typeof onValueChange === "function") {
              onValueChange(value);
            }
            field.onChange(value);
          }}
        >
          <div className="w-full flex flex-col gap-y-2">
            <SelectTrigger
              className={`${className} ${hasError && "border-red-400"} min-h-[62px] `}
            >
              <div className={`flex justify-start flex-col gap-y-2 `}>
                {showedLabel && (
                  <span className={`${field?.value && "text-xs"}`}>
                    {label}
                  </span>
                )}
                {field.value && <SelectValue />}
              </div>
            </SelectTrigger>

            {hasError && (
              <span className="text-red-400 text-xs">
                {errors[name].message}
              </span>
            )}
          </div>
          <SelectContent position="popper" align="start">
            {children}
          </SelectContent>
        </Select>
      )}
    />
  );
}
