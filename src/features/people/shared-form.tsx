import { formOptions } from "@tanstack/react-form";
import z from "zod/v4";
import mainSchema, {
    buildingBlockDef,
    BuildingBlockType,
    SliceType,
} from "../../schemas/zod-schema";

export type Person = {
    name: string;
    age: number;
};

type FormValues = {
    address: {
        line1: string;
        city: string;
    };
    slices: Array<SliceType>;
    buildingBlock: BuildingBlockType;
};

export const personSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(0, "Age must be a positive number"),
});

export const formSchema = z.object({
    address: z.object({
        line1: z.string().min(1, "Address Line 1 is required"),
        city: z.string().min(1, "City is required"),
    }),
    slices: mainSchema.shape.slices,
    buildingBlock: buildingBlockDef.nullable().default(null),
});

const defaultValues: FormValues = {
    address: {
        line1: "123 Main St",
        city: "New York",
    },
    slices: [],
    buildingBlock: null as unknown as BuildingBlockType,
};

export const peopleFormOpts = formOptions({
    defaultValues: defaultValues,
});
