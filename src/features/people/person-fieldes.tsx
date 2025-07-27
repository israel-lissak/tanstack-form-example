import { withFieldGroup } from "../../hooks/form";
import { Person } from "./shared-form.tsx";

const defaultValues: Person = {
    name: "",
    age: 0,
};

export const FieldGroupPerson = withFieldGroup({
    defaultValues: defaultValues,
    props: {
        title: "Person",
    },
    render: function Render({ group, title }) {
        return (
            <div className="flex flex-col  p-4 bg-white shadow rounded mb-4">
                <h3>{title}</h3>
                <group.AppField
                    name="name"
                    children={(field) => <field.TextField label="Name" />}
                />
                <group.AppField
                    name="age"
                    children={(field) => <field.NumberField label="Age" />}
                />
            </div>
        );
    },
});
