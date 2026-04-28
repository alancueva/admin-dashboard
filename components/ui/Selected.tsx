'use client';

import Select, { SingleValue, ActionMeta } from 'react-select';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string | number;
  label: string;
}

interface SelectedProps {
  value: Option | null;
  onChange: (value: Option | null) => void;
  options: Option[];
  placeholder?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
}

export function Selected({
  value,
  onChange,
  options,
  placeholder = 'Seleccione un producto...',
  isDisabled = false,
  isClearable = true
}: SelectedProps) {
  const handleChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (actionMeta.action === 'clear') {
      onChange(null);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full">
      <Select
        value={value}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        isClearable={isClearable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        unstyled={true}
        classNames={{
          control: ({ isDisabled: disabled, isFocused }) =>
            cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              disabled && 'cursor-not-allowed opacity-50',
              isFocused && 'border-primary ring-2 ring-primary/20'
            ),
          menu: () =>
            'mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md z-50',
          option: ({ isSelected, isFocused }) =>
            cn(
              'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm',
              isSelected && 'bg-primary text-primary-foreground',
              !isSelected && isFocused && 'bg-accent text-accent-foreground'
            ),
          placeholder: () => 'text-muted-foreground',
          singleValue: () => 'text-foreground',
          input: () => 'text-foreground',
          dropdownIndicator: () => 'text-muted-foreground',
          clearIndicator: () => 'text-muted-foreground hover:text-foreground',
          menuList: () => 'max-h-60 overflow-auto py-1'
        }}
        components={{
          DropdownIndicator: () => (
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          ),
          ClearIndicator: (props: any) => (
            <X
              className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={props.clearValue}
            />
          ),
          Option: ({ children, isSelected, isFocused, innerProps }: any) => (
            <div
              {...innerProps}
              className={cn(
                'flex items-center justify-between px-3 py-2 cursor-pointer',
                isSelected && 'bg-primary text-primary-foreground',
                !isSelected && isFocused && 'bg-accent text-accent-foreground'
              )}
            >
              <span>{children}</span>
              {isSelected && <Check className="h-4 w-4" />}
            </div>
          )
        }}
      />
    </div>
  );
}
