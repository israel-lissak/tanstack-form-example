import { useFieldContext } from "../hooks/form-context.tsx";
import { FieldErrorMessage } from "./FieldErrorMessage.tsx";

type SelectFieldProps<T> = {
    /**
     * Label for the select field.
     */
    label: string;
    /**
     * Array of options to display in the dropdown.
     * Each option should be an object with a unique value.
     */
    options: T[];
    /**
     * Get the label for a specific option.
     *
     * @param option - The option object
     * @returns The label to display for the option
     */
    getOptionLabel: (option: T) => string;
    /**
     * Get the unique value for a specific option.
     * Defaults to using getOptionLabel if not provided.
     *
     * @param option - The option object
     * @returns The unique value for the option
     */
    getOptionValue?: (option: T) => string | number;
    /**
     * Callback fired when the selected value changes.
     * Receives the newly selected option or null if cleared.
     */
    onValueChange?: (value: T | null) => void;
    /**
     * Placeholder text for the select input when no option is selected.
     * Defaults to "Select {label}..."
     */
    placeholder?: string;
};

/**
 * SelectField component for rendering a select input with options.
 *
 * @template T - The type of option objects
 *
 * @param {string} label - The label displayed next to the select field
 * @param {T[]} options - Array of options to display in the dropdown
 * @param {(option: T) => string} getOptionLabel - Function to extract display text from each option
 * @param {(option: T) => string | number} [getOptionValue] - Function to extract unique value from each option. Defaults to getOptionLabel
 * @param {(value: T | null) => void} [onValueChange] - Optional callback fired when selection changes
 * @param {string} [placeholder] - Placeholder text for empty selection. Defaults to "Select {label}..."
 *
 * @returns A select input with integrated form context and error handling
 *
 * @example
 * // Simple string options
 * <SelectField
 *   label="Color"
 *   options={["Red", "Blue", "Green"]}
 *   getOptionLabel={(color) => color}
 * />
 *
 * @example
 * // Object options with custom value
 * <SelectField
 *   label="User"
 *   options={users}
 *   getOptionLabel={(user) => user.name}
 *   getOptionValue={(user) => user.id}
 *   onValueChange={(user) => console.log('Selected:', user)}
 * />
 */
export default function SelectField<T>({
    label,
    options,
    getOptionLabel,
    getOptionValue = getOptionLabel,
    onValueChange,
    placeholder = `Select ${label.toLowerCase()}`,
}: SelectFieldProps<T>) {
    const field = useFieldContext<T | null>();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const targetValue = e.target.value;

        if (!targetValue) {
            field.handleChange(null);
            onValueChange?.(null);
            return;
        }

        const selectedOption = options.find(
            (option) => String(getOptionValue(option)) === targetValue
        );

        if (selectedOption) {
            field.handleChange(selectedOption);
            onValueChange?.(selectedOption);
        }
    };

    const currentValue = field.state.value
        ? String(getOptionValue(field.state.value))
        : "";

    return (
        <div>
            <label className="flex flex-row gap-2 items-center w-full">
                <div>{label}</div>
                <select
                    className="border border-gray-300 rounded p-2"
                    value={currentValue}
                    onChange={handleChange}
                    onBlur={field.handleBlur}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => {
                        const value = String(getOptionValue(option));
                        return (
                            <option key={value} value={value}>
                                {getOptionLabel(option)}
                            </option>
                        );
                    })}
                </select>
                <FieldErrorMessage field={field} />
            </label>
        </div>
    );
}
