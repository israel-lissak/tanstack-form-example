import { withForm } from "../../hooks/form.tsx";
import { peopleFormOpts } from "./shared-form.tsx";

export const AddressFields = withForm({
    ...peopleFormOpts,
    render: ({ form }) => {
        return (
            <div className="flex flex-col p-4 bg-gray-100 shadow rounded mb-4">
                <h2 className="text-lg">Address</h2>
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
