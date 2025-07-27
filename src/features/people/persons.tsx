import { withForm } from "../../hooks/form.tsx";
import { FieldGroupPerson } from "./person-fieldes.tsx";
import { peopleFormOpts } from "./shared-form.tsx";

export const PersonsFields = withForm({
    ...peopleFormOpts,
    render: ({ form }) => {
        return (
            <>
                <h2>Persons</h2>
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
                                            title={`Person #${i + 1}`}
                                        />
                                    );
                                })}
                                <button
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
            </>
        );
    },
});
