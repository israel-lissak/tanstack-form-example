import { withForm } from "../../hooks/form.tsx";
import { BuildingBlockType } from "../../schemas/zod-schema.ts";
import { peopleFormOpts } from "./shared-form.tsx";
import { FieldGroupSlice } from "./slice-fields.tsx";

export const SlicesFields = withForm({
    ...peopleFormOpts,
    render: ({ form }) => {
        return (
            <div className="flex flex-col p-4 bg-gray-100 shadow rounded mb-4">
                <h2 className="text-lg">Slices</h2>
                <form.Field name="slices" mode="array">
                    {(field) => {
                        return (
                            <div>
                                {field.state.value.map((_, i) => {
                                    return (
                                        <FieldGroupSlice
                                            key={i}
                                            form={form}
                                            fields={{
                                                variation: `slices[${i}].variation`,
                                                duration: `slices[${i}].duration`,
                                                building_block: `slices[${i}].building_block`,
                                            }}
                                            title={`Slice ${i + 1}`}
                                            remove={() => field.removeValue(i)}
                                        />
                                    );
                                })}
                                <button
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() =>
                                        field.pushValue({
                                            variation: "single",
                                            duration: 0,
                                            building_block:
                                                null as unknown as BuildingBlockType,
                                        })
                                    }
                                    type="button"
                                >
                                    Add slice
                                </button>
                            </div>
                        );
                    }}
                </form.Field>
            </div>
        );
    },
});
