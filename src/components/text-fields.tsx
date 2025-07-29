import { useFieldContext } from "../hooks/form-context.tsx";
import { FieldErrorMessage } from "./FieldErrorMessage.tsx";

export default function TextField({ label }: { label: string }) {
    const field = useFieldContext<string>();

    return (
        <div className="flex flex-row gap-2 items-center p-2">
            <label className="flex justify-center gap-2 items-center">
                <div>{label}: </div>
                <input
                    className="border border-gray-300 rounded p-2"
                    placeholder={`Insert ${label}`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                />
            </label>
            <FieldErrorMessage field={field} />
        </div>
    );
}
