import { z } from "zod";

const create = z.object({
    body: z.object({
        userId: z.number({
            required_error: "userId Is Required"
        }),
        serviceId: z.number({
            required_error: "service id Is Required"
        }),
        startDate: z.string({
            required_error: "startDate Is Required"
        }),
        endDate: z.string({
            required_error: "endDate Is Required"
        }),
        bookStatus: z.string({
            required_error: "bookStatus Is required"
        }),
    })
});


const update = z.object({
    body: z.object({
        serviceId: z.number().optional(),
        userId: z.number().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        bookStatus: z.string().optional(), 
    })
});

export const BookingValidation = {
    create,
    update
};