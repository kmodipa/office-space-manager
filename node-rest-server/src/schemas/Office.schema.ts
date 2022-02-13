import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        hexcolor: string({
            required_error: "Hexcolor is required",
        }),
        email: string({
            required_error: "Email is required",
        }),
        capacity: number({
            required_error: "Capacity is required",
        }),
        phone: string({
            required_error: "Phone is required",
        }),
        address: string({
            required_error: "Address is required",
        }),
    }),
};

const params = {
    params: object({
        officeId: string({
            required_error: "officeId is required",
        }),
    }),
};

export const createOfficeSchema = object({
    ...payload,
});

export const updateOfficeSchema = object({
    ...payload,
    ...params,
});

export const deleteOfficeSchema = object({
    ...params,
});

export const getOfficeSchema = object({
    ...params,
});

export type CreateOfficeInput = TypeOf<typeof createOfficeSchema>;
export type UpdateOfficeInput = TypeOf<typeof updateOfficeSchema>;
export type ReadOfficeInput = TypeOf<typeof getOfficeSchema>;
export type DeleteOfficeInput = TypeOf<typeof deleteOfficeSchema>;