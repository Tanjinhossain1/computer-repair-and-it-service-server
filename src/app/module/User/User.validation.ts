import { z } from "zod";

const create = z.object({
    body: z.object({
        password: z.string({
            required_error: "Password Is Required"
        }),
        role: z.string({
            required_error: "Role Is Required"
        }),
        firstName: z.string({
            required_error: "First Name  Is Required"
        }),
        lastName: z.string({
            required_error: "Last Name Is Required"
        }),
        middleName: z.string().optional(),
        dateOfBirth: z.string({
            required_error: "Date Of Birth Is Required"
        }), // Assuming it's in ISO date string format
        gender: z.string().optional(),
        bloodGroup: z.string().optional(),
        email: z.string({
            required_error: "Email Is Required"
        }).email(),
        contactNo: z.string({
            required_error: "Contact No Is Required"
        }),
        emergencyContactNo: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        roleBasedPermission: z.string().optional(),
        profileImage: z.string().optional(),
    })
});


const update = z.object({
    body: z.object({
        password: z.string().optional(),
        role: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
        dateOfBirth: z.string().optional(), // Assuming it's in ISO date string format
        gender: z.string().optional(),
        bloodGroup: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        roleBasedPermission: z.string().optional(),
        profileImage: z.string().optional(),
    })
});

const adminPermission = z.object({
    body: z.object({ 
        roleBasedPermission: z.string({
            required_error: "Give Permission"
        }),
    })
});
export const UserValidation = {
    create,
    update,
    adminPermission
};