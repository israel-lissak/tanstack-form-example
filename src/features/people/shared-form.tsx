import { formOptions } from "@tanstack/react-form";
import z from "zod/v4";
import {
    buildingBlockDef,
    BuildingBlockType,
    krembo,
    KremboType,
} from "../../schemas/zod-schema";

export type Person = {
    name: string;
    age: number;
};

type FormValues = {
    persons: Array<Person>;
    address: {
        line1: string;
        city: string;
    };
    emergencyContact: {
        fullName: string;
    };
    krembo: KremboType;
    buildingBlock: BuildingBlockType;
};

export const personSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(0, "Age must be a positive number"),
});

export const formSchema = z.object({
    persons: z.array(personSchema),
    address: z.object({
        line1: z.string().min(1, "Address Line 1 is required"),
        city: z.string().min(1, "City is required"),
    }),
    emergencyContact: z.object({
        fullName: z.string().min(1, "Emergency contact full name is required"),
    }),
    krembo: krembo.nullable().default(null),
    buildingBlock: buildingBlockDef.nullable().default(null),
});

const defaultValues: FormValues = {
    persons: [],
    address: {
        line1: "123 Main St",
        city: "New York",
    },
    emergencyContact: {
        fullName: "john",
    },
    krembo: {
        krembo_kind: "vanilla",
        wrap: 0,
    },
    buildingBlock: {
        kind: "cake",
        power: null,
        sugar: 1000,
    },
};

export const peopleFormOpts = formOptions({
    defaultValues: defaultValues,
});
