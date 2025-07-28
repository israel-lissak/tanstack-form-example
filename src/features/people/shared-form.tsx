import { formOptions } from "@tanstack/react-form";
import z from "zod/v4";
import { krembo, KremboType } from "../../schemas/zod-schema";

export type Person = {
    name: string;
    age: number;
};

type FormValues = {
    fullName: string;
    email: string;
    phone: string;
    persons: Array<Person>;
    address: {
        line1: string;
        city: string;
    };
    emergencyContact: {
        fullName: string;
        phone: string;
    };
    krembo: KremboType;
};

export const personSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(0, "Age must be a positive number"),
});

export const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    persons: z.array(personSchema),
    address: z.object({
        line1: z.string().min(1, "Address Line 1 is required"),
        city: z.string().min(1, "City is required"),
    }),
    emergencyContact: z.object({
        fullName: z.string().min(1, "Emergency contact full name is required"),
        phone: z.string().min(1, "Emergency contact phone is required"),
    }),
    krembo: krembo.nullable().default(null),
});

const defaultValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    persons: [],
    address: {
        line1: "123 Main St",
        city: "New York",
    },
    emergencyContact: {
        fullName: "john",
        phone: "123",
    },
    krembo: {
        krembo_kind: "vanilla",
        wrap: 0,
    },
};

export const peopleFormOpts = formOptions({
    defaultValues: defaultValues,
});
