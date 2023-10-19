import { z } from "zod";

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title Is Required"
        }),
        description: z.string({
            required_error: "Description Is Required"
        }),
        image: z.string({
            required_error: "Image Is Required"
        }),
        price: z.number({
            required_error: "Price Is Required"
        }),
        status: z.string({
            required_error: "status Is required"
        }),
        category: z.string({
            required_error: "category is required"
        }),
        serviceLocation: z.string({
            required_error: "location is required"
        }),
        rating: z.number().optional(),
    })
});


const update = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        price: z.number().optional(),
        status: z.string().optional(),
        category: z.string().optional(),
        rating: z.number().optional(),
        serviceLocation: z.string().optional(),
    })
});
const addToCart = z.object({
    body: z.object({
        userId: z.number({
            required_error:"User Id Is Required"
        }),
        serviceId: z.number({
            required_error:"Service Id Is Required"
        })
    })
});

export const ServiceValidation = {
    create,
    update,
    addToCart
};