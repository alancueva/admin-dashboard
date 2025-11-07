import Select from 'react-tailwindcss-select';

// Versión como componente reutilizable con props
interface AlmacenDestinoSelectProps {
    value: any;
    onChange: (value: any) => void;
    options: any[];
    placeholder?: string;
    isDisabled?: boolean;
}

export function Selected({
    value,
    onChange,
    options,
    placeholder = "Seleccione",
    isDisabled = false,
}: AlmacenDestinoSelectProps) {
    return (
        <div className="w-full">

            <Select
                value={value}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                isSearchable={true}
                isClearable={true}
                isDisabled={isDisabled}
                primaryColor="blue"
                classNames={{
                    menuButton: (value?: { isDisabled?: boolean }) => {
                        const isDisabled = value?.isDisabled;
                        return `flex text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none ${isDisabled
                            ? "bg-gray-200"
                            : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"}`;
                    },
                    menu: "absolute z-10 w-full bg-white shadow-lg border border-gray-200 rounded-lg py-1 mt-1.5 text-sm text-gray-700",
                    listItem: (value?: { isSelected?: boolean }) => {
                        const isSelected = value?.isSelected;
                        return `block transition duration-200 px-3 py-2 cursor-pointer select-none truncate rounded-md ${isSelected
                            ? "text-white bg-blue-500"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`;
                    },
                    searchBox:
                        "w-full py-2 px-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500/20 focus:outline-none",
                    searchIcon: "absolute left-3 top-2.5 w-5 h-5 text-gray-400",
                    closeIcon: "absolute right-3 top-2.5 w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer",
                }}
            />
        </div>
    );
}