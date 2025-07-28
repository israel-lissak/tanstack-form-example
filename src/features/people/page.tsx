import { useAppForm } from "../../hooks/form.tsx";
import { AddressFields } from "./address-fields.tsx";
import { FieldGroupEmergencyContact } from "./emergency-contact.tsx";
import { FieldGroupKrembo } from "./krembo-fieldes.tsx";
import { PersonsFields } from "./persons.tsx";
import { formSchema, peopleFormOpts } from "./shared-form.tsx";

export const PeoplePage = () => {
    const form = useAppForm({
        ...peopleFormOpts,
        validators: {
            onChange: formSchema,
        },
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value, null, 2));
        },
    });

    return (
        <div className="max-w-2xl m-auto  p-4 bg-white shadow-md rounded">
            <form.AppForm>
                <h1 className="text-2xl p-2">Personal Information</h1>

                <PersonsFields form={form} />

                <AddressFields form={form} />

                <FieldGroupEmergencyContact
                    form={form}
                    fields="emergencyContact"
                />

                <FieldGroupKrembo form={form} fields="krembo" />

                <div className="flex items-center gap-2 justify-center">
                    <form.SubscribeButton label="Submit" />

                    <button
                        className=" bg-blue-500 text-white px-4 py-2 rounded"
                        type="button"
                        onClick={() =>
                            alert(JSON.stringify(form.state.values, null, 2))
                        }
                    >
                        log
                    </button>
                </div>

                <div className="flex flex-col justify-around mt-4">
                    <form.Subscribe selector={(state) => state.values}>
                        {(values) => (
                            <div className="mt-8 p-4 bg-amber-100 rounded-lg">
                                <h3 className="font-medium mb-2">
                                    Form Values:
                                </h3>
                                <pre className="text-sm text-gray-600">
                                    {JSON.stringify(values, null, 2)}
                                </pre>
                            </div>
                        )}
                    </form.Subscribe>
                    <form.Subscribe selector={(state) => state.errorMap}>
                        {(values) => (
                            <div className="mt-8 p-4 bg-amber-100 rounded-lg">
                                <h3 className="font-medium mb-2">
                                    Form Errors:
                                </h3>
                                {Object.entries(values).map(
                                    ([field, errors]) => (
                                        <div key={field}>
                                            <pre>
                                                {JSON.stringify(
                                                    errors,
                                                    null,
                                                    2
                                                )}
                                            </pre>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </form.Subscribe>
                </div>
            </form.AppForm>
        </div>
    );
};
