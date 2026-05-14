'use client';

import React, { ChangeEvent, FC } from 'react';

export interface OptionType {
  value: string;
  label: string;
}

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'tel';
  required?: boolean;
  maxLength?: number;
}

export const InputField: FC<InputFieldProps> = ({ id, label, value, onChange, placeholder, type = 'text', required = false, maxLength }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className="h-12 w-full rounded-lg border border-line bg-background-soft px-3 py-2 text-foreground outline-none transition focus:border-[#f4c430]"
    />
  </div>
);

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: OptionType[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const SelectField: FC<SelectFieldProps> = ({ id, label, value, options, onChange, placeholder = 'Select', required = false }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="h-12 w-full rounded-lg border border-line bg-background-soft px-3 py-2 text-foreground outline-none transition focus:border-[#f4c430]"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const TextAreaField: FC<TextAreaFieldProps> = ({ id, label, value, onChange, placeholder, required = false }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      required={required}
      className="w-full rounded-lg border border-line bg-background-soft px-3 py-2 text-foreground outline-none transition focus:border-[#f4c430]"
    />
  </div>
);

interface UploadFieldProps {
  id: string;
  label: string;
  fileName: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  /** When false, omit `required` on the file input (needed when files are stored in React state / input is cleared after pick). Label still shows *. */
  nativeRequired?: boolean;
  multiple?: boolean;
  accept?: string;
}

export const UploadField: FC<UploadFieldProps> = ({
  id,
  label,
  fileName,
  onFileChange,
  required = false,
  nativeRequired,
  multiple,
  accept,
}) => {
  const inputRequired = nativeRequired ?? required;
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <label
        htmlFor={id}
        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-line bg-surface/60 px-3 text-sm text-muted hover:border-[#f4c430]/60"
      >
        <span>Drop files here or </span>
        <span className="ml-1 font-semibold text-[#f4c430] underline">browse</span>
        {fileName && <span className="ml-2 truncate text-foreground">({fileName})</span>}
      </label>
      <input id={id} type="file" className="hidden" multiple={multiple} accept={accept} onChange={onFileChange} required={inputRequired} />
    </div>
  );
};

export const vehiclePhotoDedupeKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

/** Merge newly picked files into state (deduped); clears the input so the same paths can be picked again. Same behavior as the exchange form. */
export function appendUniqueVehiclePhotosFromInput(
  e: ChangeEvent<HTMLInputElement>,
  setVehiclePhotos: React.Dispatch<React.SetStateAction<File[]>>,
): void {
  const input = e.currentTarget;
  const picked = input.files?.length ? Array.from(input.files) : [];
  input.value = '';
  if (!picked.length) return;
  setVehiclePhotos((prev) => {
    const seen = new Set(prev.map(vehiclePhotoDedupeKey));
    const next = [...prev];
    for (const file of picked) {
      const key = vehiclePhotoDedupeKey(file);
      if (!seen.has(key)) {
        seen.add(key);
        next.push(file);
      }
    }
    return next;
  });
}
