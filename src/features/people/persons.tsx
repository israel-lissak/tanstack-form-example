import { withForm } from "../../hooks/form.tsx";
import { FieldGroupPerson } from "./person-fields.tsx";
import { peopleFormOpts } from "./shared-form.tsx";

export const PersonsFields = withForm({
    ...peopleFormOpts,
    render: ({ form }) => {
        return (
            <div className="flex flex-col p-4 bg-gray-100 shadow rounded mb-4">
                <h2 className="text-lg">Persons</h2>
                <form.Field name="persons" mode="array">
                    {(field) => {
                        return (
                            <div>
                                {field.state.value.map((_, i) => {
                                    return (
                                        <FieldGroupPerson
                                            key={i}
                                            form={form}
                                            fields={`persons[${i}]`}
                                            title={`Person ${i + 1}`}
                                            remove={() => field.removeValue(i)}
                                        />
                                    );
                                })}
                                <button
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() =>
                                        field.pushValue({ name: "", age: 0 })
                                    }
                                    type="button"
                                >
                                    Add person
                                </button>
                            </div>
                        );
                    }}
                </form.Field>
            </div>
        );
    },
});
