import Select, { type SingleValue, type OptionProps, type CSSObjectWithLabel } from 'react-select';
// import { XMarkIcon } from '@heroicons/react'; // opcional, o usa lucide-react
import { Check, ChevronsUpDown, XIcon  } from 'lucide-react';
import { cn } from '@/lib/utils'; // o usa clsx/tailwind-merge si ya lo tienes

// Tipos (ajusta según tus datos reales)
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
}

export function Selected({
  value,
  onChange,
  options,
  placeholder = 'Seleccione',
  isDisabled = false,
}: SelectedProps) {
  return (
    <div className="w-full">
      <Select
        value={value}
        onChange={onChange}
        options={options}
        isSearchable={true}
        isClearable={true}
        isDisabled={isDisabled}
        placeholder={placeholder}

        // Estilos completos con Tailwind usando classNames (la forma moderna y limpia)
        classNames={{
          control: ({ isDisabled: disabled, isFocused }) =>
            cn(
              'flex text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none min-h-10',
              disabled
                ? 'bg-gray-200 cursor-not-allowed opacity-70'
                : 'bg-white hover:border-gray-400',
              isFocused && 'border-blue-500 ring ring-blue-500/20'
            ),

          menu: () =>
            'absolute z-10 w-full bg-white shadow-lg border border-gray-200 rounded-lg py-1 mt-1.5 text-sm text-gray-700',

          option: ({ isSelected, isFocused }) =>
            cn(
              'block transition duration-200 px-3 py-2 cursor-pointer select-none truncate rounded-md',
              isSelected
                ? 'text-white bg-blue-500'
                : isFocused
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700'
            ),

          input: () => 'text-sm text-gray-700',
          placeholder: () => 'text-gray-500',
          singleValue: () => 'text-gray-700',
          dropdownIndicator: () => 'text-gray-400 hover:text-gray-600',
          clearIndicator: () => 'text-gray-400 hover:text-gray-600',
          indicatorSeparator: () => 'bg-gray-300',

          menuList: () => 'max-h-60 overflow-y-auto',
        }}

        // Iconos personalizados (opcional pero queda idéntico al original)
        components={{
          DropdownIndicator: () => (
            <ChevronsUpDown className="w-5 h-5 text-gray-400 mr-2" />
          ),
          ClearIndicator: (props) => (
            <XIcon
              className="w-5 h-5 text-gray-400 hover:text-gray-600 mx-2 cursor-pointer"
              onClick={props.clearValue}
            />
          ),
          Option: ({ children, isSelected, ...props }: any) => (
            <div
              {...props.innerProps}
              className={cn(
                'flex items-center justify-between px-3 py-2 cursor-pointer',
                isSelected && 'text-white bg-blue-500',
                !isSelected && props.isFocused && 'bg-blue-50 text-blue-600'
              )}
            >
              <span>{children}</span>
              {isSelected && <Check className="w-4 h-4" />}
            </div>
          ),
        }}

        // Para que funcione perfecto con Tailwind v4 + formas bonitas
        unstyled={true}
      />
    </div>
  );
}