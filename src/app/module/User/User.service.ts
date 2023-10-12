import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";


export const CreateUser = async (data: User) => {
    const result = await prisma.user.create({
        data,
    });
    return result;
}

export const GetAllNormalUser = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "user"
        }
    });
    return result;
}

export const GetAllAdmin = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "admin"
        }
    });
    return result;
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