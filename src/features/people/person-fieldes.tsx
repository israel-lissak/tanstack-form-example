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
        remove: () => {},
    },
    render: function Render({ group, title, remove }) {
        return (
            <div className="flex flex-col p-4 bg-white shadow rounded mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button
                        type="button"
                        className="mt-4 p-2 bg-red-400 text-white rounded"
                        onClick={remove}
                    >
                        Remove {title}
                    </button>
                </div>
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
