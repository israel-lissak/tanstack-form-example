import * as z from "zod/v4";

// Base definitions
const variationDef = z.enum(["single", "multi", "cyclic"]);

const sugar = z
    .number()
    .int()
    .min(1000, "Sugar must be at least 1000 grams")
    .max(6000, "Sugar must be at most 6000 grams");
const flour = z.number().int().min(0).max(164);
const eggCount = z.number().int().min(0).max(164);

type ParentPathType =
    | `slices[${number}]`
    | `slices[${number}].techniques[${number}]`
    | `slices[${number}].techniques[${number}].techniques[${number}]`;

export const krembo = z
    .discriminatedUnion("krembo_kind", [
        z.object({
            krembo_kind: z.literal("vanilla"),
            wrap: z.number().int().min(0).max(30),
        }),
        z.object({
            krembo_kind: z.literal("mocha"),
            code: z.string().max(4),
            crackles: z.enum(["I", "N"]),
        }),
    ])
    .nullable();

export type KremboType = z.infer<typeof krembo>;

export const buildingBlockDef = z
    .discriminatedUnion("kind", [
        z.object({
            kind: z.literal("cake"),
            sugar,
        }),

        z.object({
            kind: z.literal("cookie"),
            sugar,
            flour,
            egg_count: eggCount,
        }),

        z.object({
            kind: z.literal("sweet"),
            start_cooking: sugar,
            end_cooking: sugar,
            cooking_time: z.number().min(40).max(3000),
            temperature_gap: flour.optional(),
            cooking_dwell: z.number().min(100).max(1500).optional(),
        }),

        z.object({
            kind: z.literal("pancake"),
            path: z.string().regex(/^.*\.(bin|xdat|xhdr)$/),
            sugar,
        }),

        z.object({
            kind: z.literal("american_pancake"),
            path: z.string().regex(/^.*\.(wav|mp4)$/),
            sugar,
            flour,
            krembo,
        }),

        z.object({
            kind: z.literal("biscuit"),
            sugar,
            flour,
            krembo,
        }),

        z.object({
            kind: z.literal("brownie"),
            brownie_string: z.string().regex(/^[0-9a-fA-F]+$/),
            sugar,
            flour,
            brownie_time: z.number(),
            brownie_cooking_time: z.number(),
            krembo,
        }),
    ])
    .nullable();

export type BuildingBlockType = z.infer<typeof buildingBlockDef>;

// Forward declaration for recursive type
type BaseStepType = z.infer<typeof baseStepDef>;

const baseStepDef: z.ZodType<any> = z.discriminatedUnion("variation", [
    // Single variation
    z.object({
        variation: z.literal("single"),
        duration: z.union([z.number(), z.null()]),
        building_block: buildingBlockDef,
    }),

    // Multi variation
    z.object({
        variation: z.literal("multi"),
        duration: z.union([z.number(), z.null()]),
        techniques: z
            .array(
                z.lazy(() =>
                    baseStepDef.refine(
                        (data) => {
                            // In multi, techniques can't have duration as number (must be null)
                            // and variation must be single or cyclic
                            return (
                                data.duration === null &&
                                (data.variation === "single" ||
                                    data.variation === "cyclic")
                            );
                        },
                        {
                            message:
                                "Multi techniques must have null duration and be single or cyclic variation",
                        }
                    )
                )
            )
            .min(2),
    }),

    // Cyclic variation
    z.object({
        variation: z.literal("cyclic"),
        duration: z.number().min(100),
        techniques: z
            .array(
                z.lazy(() =>
                    baseStepDef.refine(
                        (data) => {
                            // In cyclic, techniques must have numeric duration
                            // and variation must be single or multi
                            return (
                                typeof data.duration === "number" &&
                                data.duration >= 100 &&
                                (data.variation === "single" ||
                                    data.variation === "multi")
                            );
                        },
                        {
                            message:
                                "Cyclic techniques must have numeric duration >= 100 and be single or multi variation",
                        }
                    )
                )
            )
            .min(2),
    }),
]);

// Slice definition - similar to base step but with additional constraints
const sliceDef = baseStepDef
    .refine(
        (data) => {
            // Slices must have numeric duration
            return typeof data.duration === "number";
        },
        {
            message: "Slices must have numeric duration",
        }
    )
    .refine(
        (data) => {
            // Additional validation for slice-specific constraints
            if (data.variation === "multi" || data.variation === "cyclic") {
                // Check nesting constraints for slices
                if ("techniques" in data) {
                    return data.techniques.every((technique: any) => {
                        if (
                            technique.variation === "multi" ||
                            technique.variation === "cyclic"
                        ) {
                            if ("techniques" in technique) {
                                return technique.techniques.every(
                                    (innerTech: any) =>
                                        innerTech.variation === "single"
                                );
                            }
                        }
                        return true;
                    });
                }
            }
            return true;
        },
        {
            message:
                "Slice techniques cannot have more than 2 levels of nesting",
        }
    );

// Main schema
const mainSchema = z
    .object({
        $schema: z.string().optional(),
        slices: z.array(sliceDef).optional(),
    })
    .refine(
        (data) => {
            // If there are at least 2 slices, they must have duration defined
            if (data.slices && data.slices.length >= 2) {
                return data.slices.every(
                    (slice) =>
                        typeof slice.duration === "number" &&
                        slice.duration >= 40e-6 &&
                        slice.duration <= 3e3
                );
            }
            // If there's only one slice, duration constraints still apply
            if (data.slices && data.slices.length === 1) {
                const slice = data.slices[0];
                return (
                    typeof slice.duration === "number" &&
                    slice.duration >= 40e-6 &&
                    slice.duration <= 3e3
                );
            }
            return true;
        },
        {
            message:
                "Duration constraints: slices must have numeric duration (40e-6 to 3e3)",
        }
    );

// Export the schema
export default mainSchema;

// Type inference
export type MainSchemaType = z.infer<typeof mainSchema>;
export type SliceType = z.infer<typeof sliceDef>;

const example: MainSchemaType = {
    slices: [
        {
            variation: "multi",
            duration: 4.5,
            building_block: {
                kind: "biscuit",
                flour: 100,
                sugar: 1000,
                krembo: {
                    krembo_kind: "vanilla",
                    wrap: 10,
                },
            },
        },
        {
            variation: "multi",
            duration: 444,
            techniques: [
                {
                    variation: "single",
                    duration: null,
                    building_block: {
                        kind: "cookie",
                        egg_count: 12,
                        flour: 100,
                        sugar: 1000,
                    },
                },
                {
                    variation: "cyclic",
                    duration: null,
                    techniques: [
                        {
                            duration: 100,
                            variation: "single",
                            building_block: {
                                kind: "cake",
                                sugar: 1000,
                            },
                        },
                        {
                            duration: 100,
                            variation: "single",
                            building_block: {
                                kind: "pancake",
                                path: "meow.bin",
                                sugar: 1000,
                            },
                        },
                    ],
                },
            ],
        },
        {
            variation: "cyclic",
            duration: 100,
            techniques: [
                {
                    duration: 100,
                    variation: "single",
                    building_block: {
                        kind: "cake",
                        sugar: 1000,
                    },
                },
                {
                    variation: "multi",
                    duration: 444,
                    techniques: [
                        {
                            variation: "single",
                            duration: null,
                            building_block: {
                                kind: "cookie",
                                sugar: 1000,
                                egg_count: 12,
                                flour: 100,
                            },
                        },
                        {
                            variation: "single",
                            duration: null,
                            building_block: {
                                kind: "cookie",
                                sugar: 1000,
                                egg_count: 12,
                                flour: 100,
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
