"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.number({
            required_error: "userId Is Required"
        }),
        serviceId: zod_1.z.number({
            required_error: "service id Is Required"
        }),
        startDate: zod_1.z.string({
            required_error: "startDate Is Required"
        }),
        endDate: zod_1.z.string({
            required_error: "endDate Is Required"
        }),
        bookStatus: zod_1.z.string({
            required_error: "bookStatus Is required"
        }),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.number().optional(),
        userId: zod_1.z.number().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        bookStatus: zod_1.z.string().optional(),
    })
});
exports.BookingValidation = {
    create,
    update
};
