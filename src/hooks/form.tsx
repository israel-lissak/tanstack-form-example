import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext, useFormContext } from "./form-context.tsx";

import NumberField from "../components/number-fields.tsx";
import TextField from "../components/text-fields.tsx";

function SubscribeButton({ label }: { label: string }) {
    const form = useFormContext();
    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
        </form.Subscribe>
    );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldComponents: {
        TextField,
        NumberField,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
});
