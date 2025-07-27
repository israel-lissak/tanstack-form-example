import { useFieldContext } from "../hooks/form-context.tsx";
import { FieldInfo } from "./FieldInfo.tsx";

export default function TextField({ label }: { label: string }) {
    const field = useFieldContext<string>();

    return (
        <div>
            <label>
                <div>{label}</div>
                <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                />
            </label>
            <FieldInfo field={field} />
        </div>
    );
}
