"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "title Is Required"
        }),
        topShortDescription: zod_1.z.string({
            required_error: "topShortDescription id Is Required"
        }),
        image: zod_1.z.string({
            required_error: "image Is Required"
        }),
        description: zod_1.z.string({
            required_error: "description Is Required"
        }),
    })
});
const createFaqs = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({
            required_error: "title Is Required"
        }),
        ans: zod_1.z.string({
            required_error: "ans Is Required"
        }),
    })
});
exports.BlogPostValidation = {
    create,
    createFaqs
};
