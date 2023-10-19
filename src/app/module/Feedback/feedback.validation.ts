import { z } from "zod";

const create = z.object({
    body: z.object({
        userId: z.number().optional(), 
        comment: z.string().optional(),
        suggestion: z.string().optional(), 
    })
});
 
  
export const FeedBackValidation = {
    create, 
};