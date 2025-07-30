import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAppForm } from "../../hooks/form.tsx";
import { AddressFields } from "./address-fields.tsx";
import { FieldGroupBuildingBlock } from "./buildingBlock-fields.tsx";
import { PersonsFields } from "./persons.tsx";
import { formSchema, peopleFormOpts } from "./shared-form.tsx";

export const PeoplePage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const form = useAppForm({
        ...peopleFormOpts,
        validators: {
            onChange: formSchema,
        },
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value, null, 2));
        },
    });

    const pages = [
        <PersonsFields form={form} key="persons" />,
        <AddressFields form={form} key="address" />,
        <FieldGroupBuildingBlock
            form={form}
            fields="buildingBlock"
            key="buildingBlock"
        />,
    ];

    const handleNext = () => {
        if (form.state.errors.length === 0) {
            setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
        } else {
            alert("Please fix the errors before proceeding.");
        }
    };

    const handleBack = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="max-w-2xl m-auto p-4 bg-white shadow-md rounded">
            <form.AppForm>
                <h1 className="text-2xl p-2">Personal Information</h1>

                {pages[currentPage]}

                <div className="flex items-center gap-2 justify-center mt-4">
                    {currentPage > 0 && (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded flex"
                            type="button"
                            onClick={handleBack}
                        >
                            <ArrowLeft />
                            Back
                        </button>
                    )}

                    {currentPage < pages.length - 1 ? (
                        <form.Subscribe selector={(state) => state.errors}>
                            {(errors) => (
                                <button
                                    className="bg-blue-500 disabled:bg-gray-300 text-white px-4 py-2 rounded flex"
                                    type="button"
                                    onClick={handleNext}
                                    disabled={
                                        errors.length > 0 ||
                                        form.state.isSubmitting ||
                                        !form.state.canSubmit
                                    }
                                    title={
                                        errors.length > 0
                                            ? "Please fix the errors before proceeding."
                                            : ""
                                    }
                                >
                                    Next
                                    <ArrowRight />
                                </button>
                            )}
                        </form.Subscribe>
                    ) : (
                        <form.SubscribeButton label="Submit" />
                    )}
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
