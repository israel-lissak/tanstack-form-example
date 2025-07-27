import { useFieldContext } from "../hooks/form-context.tsx";
import { FieldInfo } from "./FieldInfo.tsx";

/**
 * CheckboxField component for rendering a checkbox input with label and error handling.
 * @param {string} label - The label for the checkbox field.
 * @returns A checkbox input with label and error handling.
 */
export default function CheckboxField({ label }: { label: string }) {
    const field = useFieldContext<boolean>();

    return (
        <div className="flex flex-row gap-2 items-center p-2">
            <label className="flex flex-row gap-2 items-center">
                <div>{label}</div>
                <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="h-6 w-6"
                />
            </label>
            <FieldInfo field={field} />
        </div>
    );
}
