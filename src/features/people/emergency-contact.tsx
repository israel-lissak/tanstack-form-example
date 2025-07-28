import { withFieldGroup } from "../../hooks/form";

export const FieldGroupEmergencyContact = withFieldGroup({
    defaultValues: {
        fullName: "",
    },
    render: function Render({ group }) {
        return (
            <div className="flex flex-col p-4 bg-gray-100 shadow rounded mb-4">
                <h2>Emergency Contact</h2>

                <group.AppField
                    name="fullName"
                    children={(field) => <field.TextField label="Full Name" />}
                />
            </div>
        );
    },
});
