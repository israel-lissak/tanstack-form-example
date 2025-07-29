import { withFieldGroup } from "../../hooks/form.tsx";
import { BuildingBlockType } from "../../schemas/zod-schema.ts";
import { FieldGroupKrembo } from "./krembo-fieldes.tsx";

const defaultValues: BuildingBlockType = null as BuildingBlockType;

export const FieldGroupBuildingBlock = withFieldGroup({
    defaultValues: defaultValues,

    render: function Render({ group }) {
        return (
            <div className="flex flex-col p-4 bg-gray-100 shadow rounded mb-4">
                <div>
                    <h3>Building Block</h3>
                    <group.AppField
                        name="kind"
                        children={(field) => (
                            <field.SelectField
                                label="Building Block Kind"
                                getOptionLabel={(option: any) =>
                                    option as string
                                }
                                options={[
                                    "cake",
                                    "cookie",
                                    "sweet",
                                    "pancake",
                                    "american_pancake",
                                    "biscuit",
                                    "brownie",
                                ]}
                                onValueChange={() => {
                                    // Reset all fields when kind changes
                                    group.resetField("power");
                                    group.resetField("sugar");
                                    group.resetField("flour");
                                    group.resetField("egg_count");
                                    group.resetField("krembo");
                                    group.resetField("path");
                                }}
                            />
                        )}
                    />
                </div>
                <group.Subscribe selector={(state) => state.values?.kind}>
                    {(kind) => (
                        <div className="flex flex-col mt-2">
                            {kind === "cake" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="sugar"
                                        children={(field) => (
                                            <field.NumberField label="Sugar" />
                                        )}
                                    />
                                </div>
                            )}
                            {kind === "cookie" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="sugar"
                                        children={(field) => (
                                            <field.NumberField label="Sugar" />
                                        )}
                                    />
                                    <group.AppField
                                        name="flour"
                                        children={(field) => (
                                            <field.NumberField label="Flour" />
                                        )}
                                    />
                                    <group.AppField
                                        name="egg_count"
                                        children={(field) => (
                                            <field.NumberField label="Egg Count" />
                                        )}
                                    />
                                </div>
                            )}
                            {kind === "sweet" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="start_cooking"
                                        children={(field) => (
                                            <field.NumberField label="Start Cooking" />
                                        )}
                                    />
                                    <group.AppField
                                        name="end_cooking"
                                        children={(field) => (
                                            <field.NumberField label="End Cooking" />
                                        )}
                                    />
                                    <group.AppField
                                        name="cooking_time"
                                        children={(field) => (
                                            <field.NumberField label="Cooking Time" />
                                        )}
                                    />
                                    <group.AppField
                                        name="temperature_gap"
                                        children={(field) => (
                                            <field.NumberField label="Temperature Gap" />
                                        )}
                                    />
                                    <group.AppField
                                        name="cooking_dwell"
                                        children={(field) => (
                                            <field.NumberField label="Cooking Dwell" />
                                        )}
                                    />
                                </div>
                            )}
                            {kind === "pancake" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="path"
                                        children={(field) => (
                                            <field.TextField label="Path" />
                                        )}
                                    />
                                    <group.AppField
                                        name="sugar"
                                        children={(field) => (
                                            <field.NumberField label="Sugar" />
                                        )}
                                    />
                                </div>
                            )}
                            {kind === "american_pancake" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="path"
                                        children={(field) => (
                                            <field.TextField label="Path" />
                                        )}
                                    />
                                    <group.AppField
                                        name="sugar"
                                        children={(field) => (
                                            <field.NumberField label="Sugar" />
                                        )}
                                    />
                                    <group.AppField
                                        name="flour"
                                        children={(field) => (
                                            <field.NumberField label="Flour" />
                                        )}
                                    />
                                    <FieldGroupKrembo
                                        form={group}
                                        fields="krembo"
                                    />
                                </div>
                            )}
                            {kind === "biscuit" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="sugar"
                                        children={(field) => (
                                            <field.NumberField label="Sugar" />
                                        )}
                                    />
                                    <group.AppField
                                        name="flour"
                                        children={(field) => (
                                            <field.NumberField label="Flour" />
                                        )}
                                    />
                                    <FieldGroupKrembo
                                        form={group}
                                        fields="krembo"
                                    />
                                </div>
                            )}
                            {kind === "brownie" && (
                                <div className="flex flex-col bg-white p-2 rounded">
                                    <group.AppField
                                        name="power"
                                        children={(field) => (
                                            <field.NumberField label="Power" />
                                        )}
                                    />
                                    <group.AppField
                                        name="sugar"
                                        children={(field) => (
                                            <field.NumberField label="Sugar" />
                                        )}
                                    />
                                    <group.AppField
                                        name="flour"
                                        children={(field) => (
                                            <field.NumberField label="Flour" />
                                        )}
                                    />
                                    <group.AppField
                                        name="brownie_string"
                                        children={(field) => (
                                            <field.TextField label="Brownie String" />
                                        )}
                                    />
                                    <group.AppField
                                        name="brownie_time"
                                        children={(field) => (
                                            <field.NumberField label="Brownie Time" />
                                        )}
                                    />
                                    <group.AppField
                                        name="brownie_cooking_time"
                                        children={(field) => (
                                            <field.NumberField label="Brownie Cooking Time" />
                                        )}
                                    />
                                    <FieldGroupKrembo
                                        form={group}
                                        fields="krembo"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </group.Subscribe>
            </div>
        );
    },
});
