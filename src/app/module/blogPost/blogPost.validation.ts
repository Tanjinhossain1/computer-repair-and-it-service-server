import { z } from "zod";

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: "title Is Required"
        }),
        topShortDescription: z.string({
            required_error: "topShortDescription id Is Required"
        }),
        image: z.string({
            required_error: "image Is Required"
        }),
        description: z.string({
            required_error: "description Is Required"
        }), 
    })
});
const createFaqs = z.object({
    body: z.object({
        question: z.string({
            required_error: "title Is Required"
        }), 
        ans:  z.string({
            required_error: "ans Is Required"
        }),
    })
});
 

export const BlogPostValidation = {
    create ,
    createFaqs
};