import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";


export const CreateUser = async (data: User) => {
    const result = await prisma.user.create({
        data,
    });
    return result;
}

export const GetAllNormalUser = async ( filters: {searchTerm?: string},
    options: IPaginationOptions) => {
    const userSearchAbleFields = ['email', "firstName","lastName","middleName","role","contactNo","gender"];

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    console.log(options)
    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    /**
     * person = { name: 'fahim' }
     * name = person[name]
     * 
     */

    const whereConditons: Prisma.UserWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.user.findMany({
        where: {...whereConditons,role:"user"},
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            }
    });

    const total = result.length

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    } 
}

export const GetAllAdmin =async ( filters: {searchTerm?: string},
    options: IPaginationOptions) => {
    const userSearchAbleFields = ['email', "firstName","lastName","middleName","role","contactNo","gender"];

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    console.log(options)
    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    /**
     * person = { name: 'fahim' }
     * name = person[name]
     * 
     */

    const whereConditons: Prisma.UserWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.user.findMany({
        where: {...whereConditons,role:"admin"},
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            }
    });

    const total = result.length

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    } 
}
export const UpdateUser = async (id: number, payload: User) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
    })
    return result;
}
export const DeleteUser = async (id: number) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const result = await prisma.user.delete({
        where: {
            id
        }, 
    })
    return result;
}

const GetProfileDetail = async (id: number) =>{
    const isUserExist = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const result = await prisma.user.findUnique({
     where: {id}
    });
    return result;
}

export const GiveAdminPermission = async (id: number,data: User) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const result = await prisma.user.update({
        where: {id},
        data
    });
    return result;
}
export const UserServices = {
    CreateUser,
    GetAllNormalUser,
    GetAllAdmin,
    UpdateUser,
    DeleteUser,
    GetProfileDetail,
    GiveAdminPermission
}