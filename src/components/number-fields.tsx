import { useFieldContext } from "../hooks/form-context.tsx";
import { FieldInfo } from "./FieldInfo.tsx";

export default function NumberField({ label }: { label: string }) {
    const field = useFieldContext<number>();

    return (
        <div>
            <label>
                <div>{label}</div>
                <input
                    value={field.state.value}
                    type="number"
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                />
            </label>
            <FieldInfo field={field} />
        </div>
    );
}
