import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        firstName: string({
            required_error: "FirstName is required",
        }),
        lastName: string({
            required_error: "LastName is required",
        }),
        avatarUrl: string({
            required_error: "AvatarUrl is required",
        }),
        officeId: string({
            required_error: "OfficeId is required",
        })
    }),
};

const params = {
    params: object({
        officeWorkerId: string({
            required_error: "officeWorkerId is required",
        })
    })
};

export const createOfficeWorkerSchema = object({
    ...payload,
});

export const updateOfficeWorkerSchema = object({
    ...payload,
    ...params,
});

export const deleteOfficeWorkerSchema = object({
    ...params
});

export const getOfficeWorkerSchema = object({
    ...params,
});

export const getOfficeWorkersSchema = object({
    params: object({
        officeId: string({
            required_error: "officeId is required",
        }),
    })
});

export type CreateOfficeWorkerInput = TypeOf<typeof createOfficeWorkerSchema>;
export type UpdateOfficeWorkerInput = TypeOf<typeof updateOfficeWorkerSchema>;
export type ReadOfficeWorkerInput = TypeOf<typeof getOfficeWorkerSchema>;
export type ReadOfficeWorkersInput = TypeOf<typeof getOfficeWorkersSchema>;
export type DeleteOfficeWorkerInput = TypeOf<typeof deleteOfficeWorkerSchema>;