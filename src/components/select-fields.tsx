import { useFieldContext } from "../hooks/form-context.tsx";
import { FieldInfo } from "./FieldInfo.tsx";

/**
 * SelectField component for rendering a select input with options.
 * @param {string} label - The label for the select field.
 * @param {T[]} options - The options to display in the select dropdown.
 * @param {(option: T) => string} getOptionLabel - Function to get the label for each option.
 * @param onValueChange - Callback function to handle value changes.
 * @returns A select input with options and error handling.
 */
export default function SelectField<T>({
    label,
    options,
    getOptionLabel,
    onValueChange,
}: {
    label: string;
    options: T[];
    getOptionLabel: (option: T) => string;
    onValueChange?: (value: T) => void;
}) {
    const field = useFieldContext<T>();

    return (
        <div>
            <label className="flex flex-row gap-2 items-center w-full">
                <div>{label}</div>
                <select
                    className="border border-gray-300 rounded p-2 "
                    onChange={(e) => {
                        const selectedValue = options.find(
                            (option) =>
                                getOptionLabel(option) === e.target.value
                        );
                        if (selectedValue) {
                            field.handleChange(selectedValue);
                            if (onValueChange) {
                                onValueChange(selectedValue);
                            }
                        }
                    }}
                    onBlur={field.handleBlur}
                >
                    {options.map((option) => (
                        <option
                            key={getOptionLabel(option)}
                            value={getOptionLabel(option)}
                        >
                            {getOptionLabel(option)}
                        </option>
                    ))}
                </select>
                <FieldInfo field={field} />
            </label>
        </div>
    );
}
