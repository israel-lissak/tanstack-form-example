import { withForm } from "../../hooks/form.tsx";
import { peopleFormOpts } from "./shared-form.tsx";

export const AddressFields = withForm({
    ...peopleFormOpts,
    render: ({ form }) => {
        return (
            <div>
                <h2>Address</h2>
                <form.AppField
                    name="address.line1"
                    children={(field) => (
                        <field.TextField label="Address Line 1" />
                    )}
                />
                <form.AppField
                    name="address.city"
                    children={(field) => <field.TextField label="City" />}
                />
            </div>
        );
    },
});
