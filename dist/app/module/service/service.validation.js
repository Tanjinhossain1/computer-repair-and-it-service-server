"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title Is Required"
        }),
        description: zod_1.z.string({
            required_error: "Description Is Required"
        }),
        image: zod_1.z.string({
            required_error: "Image Is Required"
        }),
        price: zod_1.z.number({
            required_error: "Price Is Required"
        }),
        status: zod_1.z.string({
            required_error: "status Is required"
        }),
        category: zod_1.z.string({
            required_error: "category is required"
        }),
        rating: zod_1.z.number().optional(),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        status: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
    })
});
exports.ServiceValidation = {
    create,
    update
};
