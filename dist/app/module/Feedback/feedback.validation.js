"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBackValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.number().optional(),
        comment: zod_1.z.string().optional(),
        suggestion: zod_1.z.string().optional(),
    })
});
exports.FeedBackValidation = {
    create,
};
