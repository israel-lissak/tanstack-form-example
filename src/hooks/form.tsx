import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext, useFormContext } from "./form-context.tsx";

import CheckboxField from "../components/checkbox-field.tsx";
import NumberField from "../components/number-fields.tsx";
import SelectField from "../components/select-fields.tsx";
import TextField from "../components/text-fields.tsx";

function SubscribeButton({ label }: { label: string }) {
    const form = useFormContext();
    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
                <button
                    disabled={isSubmitting}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {label}
                </button>
            )}
        </form.Subscribe>
    );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldComponents: {
        TextField,
        NumberField,
        SelectField,
        CheckboxField,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
});
