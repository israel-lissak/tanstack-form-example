import { withFieldGroup } from "../../hooks/form.tsx";
import { BuildingBlockType, SliceType } from "../../schemas/zod-schema.ts";
import { FieldGroupBuildingBlock } from "./buildingBlock-fields.tsx";

const defaultValues: SliceType = {
    variation: "single",
    duration: 0,
    building_block: null as unknown as BuildingBlockType,
};

export const FieldGroupSlice = withFieldGroup({
    defaultValues: defaultValues,
    props: {
        title: "Slice",
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
                    name="duration"
                    children={(field) => <field.NumberField label="Duration" />}
                />
                <FieldGroupBuildingBlock
                    form={group}
                    fields="building_block"
                    key="building_block"
                />
            </div>
        );
    },
});
