import { withFieldGroup } from "../../hooks/form.tsx";
import { KremboType } from "../../schemas/zod-schema.ts";

const defaultValues: KremboType = null as KremboType;

export const FieldGroupKrembo = withFieldGroup({
    defaultValues: defaultValues,

    render: function Render({ group }) {
        return (
            <div className="flex flex-col  p-4 bg-gray-100 shadow rounded mb-4">
                <h3>Krembo</h3>
                <group.AppField
                    name="krembo_kind"
                    children={(field) => (
                        <field.SelectField
                            label="Krembo Kind"
                            getOptionLabel={(option: any) => option as string}
                            options={["vanilla", "mocha"]}
                            onValueChange={(value) => {
                                // Reset krembo values when kind changes
                                if (value === "vanilla") {
                                    // Reset mocha-specific fields
                                    group.deleteField("code");
                                    group.deleteField("crackles");
                                }
                                if (value === "mocha") {
                                    // Reset vanilla-specific fields
                                    group.deleteField("wrap");
                                }
                                if (value === null) {
                                    // Reset all krembo fields if value is null
                                    group.deleteField("wrap");
                                    group.deleteField("code");
                                    group.deleteField("crackles");
                                }
                            }}
                        />
                    )}
                />
                <group.Subscribe
                    selector={(state) => state.values?.krembo_kind}
                >
                    {(kremboKind) => (
                        <>
                            {kremboKind === "vanilla" && (
                                <group.AppField
                                    name="wrap"
                                    children={(field) => (
                                        <field.NumberField label="Wrap" />
                                    )}
                                />
                            )}
                            {kremboKind === "mocha" && (
                                <>
                                    <group.AppField
                                        name="code"
                                        children={(field) => (
                                            <field.TextField label="Chocolate Code" />
                                        )}
                                    />
                                    <group.AppField
                                        name="crackles"
                                        children={(field) => (
                                            <field.SelectField
                                                label="Crackles"
                                                getOptionLabel={(option) =>
                                                    option
                                                }
                                                options={["I", "N"]}
                                            />
                                        )}
                                    />
                                </>
                            )}
                        </>
                    )}
                </group.Subscribe>
            </div>
        );
    },
});
