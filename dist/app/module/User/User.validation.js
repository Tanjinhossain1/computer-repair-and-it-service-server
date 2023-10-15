"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password Is Required"
        }),
        role: zod_1.z.string({
            required_error: "Role Is Required"
        }),
        firstName: zod_1.z.string({
            required_error: "First Name  Is Required"
        }),
        lastName: zod_1.z.string({
            required_error: "Last Name Is Required"
        }),
        middleName: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string({
            required_error: "Date Of Birth Is Required"
        }),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        email: zod_1.z.string({
            required_error: "Email Is Required"
        }).email(),
        contactNo: zod_1.z.string({
            required_error: "Contact No Is Required"
        }),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        roleBasedPermission: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        roleBasedPermission: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    })
});
const adminPermission = zod_1.z.object({
    body: zod_1.z.object({
        roleBasedPermission: zod_1.z.string({
            required_error: "Give Permission"
        }),
    })
});
exports.UserValidation = {
    create,
    update,
    adminPermission
};
