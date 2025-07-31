import * as z from "zod/v4";

// Base definitions
const variationDef = z.enum(["single", "multi", "cyclic"]);
export type VariationType = z.infer<typeof variationDef>;

const sugar = z
    .number()
    .int()
    .min(1000, "Sugar must be at least 1000 grams")
    .max(6000, "Sugar must be at most 6000 grams");

const flour = z.number().int().min(0).max(164);
const eggCount = z.number().int().min(0).max(164);

// Krembo definition matching JSON Schema exactly
export const krembo = z
    .discriminatedUnion("krembo_kind", [
        z.object({
            krembo_kind: z.literal("vanilla"),
            wrap: z.number().int().min(0).max(30),
        }),
        z.object({
            krembo_kind: z.literal("mocha"),
            code: z.string().max(4),
            crackles: z.enum(["I", "N"]).default("I"),
        }),
    ])
    .nullable();

export type KremboType = z.infer<typeof krembo>;

// Building block definition matching JSON Schema exactly
export const buildingBlockDef = z.discriminatedUnion("kind", [
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
        path: z
            .string()
            .regex(/^.*\.(bin|xdat|xhdr)$/)
            .default("meow.bin"),
        sugar,
    }),

    z.object({
        kind: z.literal("american_pancake"),
        path: z
            .string()
            .regex(/^.*\.(wav|mp4)$/)
            .default("meow.wav"),
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
]);

export type BuildingBlockType = z.infer<typeof buildingBlockDef>;

// Slice definition with proper nesting constraints
const sliceDef = z.discriminatedUnion("variation", [
    // Single slice
    z.object({
        variation: z.literal("single"),
        duration: z.number().min(40e-6).max(3e3),
        building_block: buildingBlockDef,
    }),

    // Multi slice
    z.object({
        variation: z.literal("multi"),
        duration: z.number().min(40e-6).max(3e3),
        techniques: z.array(z.lazy(() => sliceTechniqueInMulti)).min(2),
    }),

    // Cyclic slice
    z.object({
        variation: z.literal("cyclic"),
        duration: z.number().min(40e-6).max(3e3),
        techniques: z.array(z.lazy(() => sliceTechniqueInCyclic)).min(2),
    }),
]);

// Slice technique definitions with nesting limits
const sliceTechniqueInMulti = z.discriminatedUnion("variation", [
    z.object({
        variation: z.literal("single"),
        duration: z.null(),
        building_block: buildingBlockDef,
    }),

    z.object({
        variation: z.literal("cyclic"),
        duration: z.null(),
        techniques: z
            .array(
                // Level 3: must be single only (no more nesting)
                z.object({
                    variation: z.literal("single"),
                    duration: z.number().min(100),
                    building_block: buildingBlockDef,
                })
            )
            .min(2),
    }),
]);

const sliceTechniqueInCyclic = z.discriminatedUnion("variation", [
    z.object({
        variation: z.literal("single"),
        duration: z.number().min(100),
        building_block: buildingBlockDef,
    }),

    z.object({
        variation: z.literal("multi"),
        duration: z.number().min(100),
        techniques: z
            .array(
                // Level 3: must be single only (no more nesting)
                z.object({
                    variation: z.literal("single"),
                    duration: z.null(),
                    building_block: buildingBlockDef,
                })
            )
            .min(2),
    }),
]);

// Main schema with JSON Schema matching logic
const mainSchema = z.object({
    slices: z.array(sliceDef).min(1, "At least one slice is required"),
});

// Export the schema
export default mainSchema;

// Type inference
export type MainSchemaType = z.infer<typeof mainSchema>;
export type SliceType = z.infer<typeof sliceDef>;

const example: MainSchemaType = {
    slices: [
        {
            variation: "single",
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
                    ],
                },
            ],
        },
    ],
};
