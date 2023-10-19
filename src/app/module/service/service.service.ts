import { AddToCart, Prisma, Service } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const CreateService = async (data: Service) => {
    const result = await prisma.service.create({
        data,
    });
    return result;
}

const CreateAddToCart = async (data: AddToCart) => {
    const isExist = await prisma.addToCart.findFirst({
        where: {
            userId: data.userId,
            serviceId:data.serviceId
        }
    })

    if (isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This Service Already Added In cart');
    }

    const result = await prisma.addToCart.create({
        data,
    });

    return result;
}

const GetAllAddToCart = async (userId:number) => {
    const result = await prisma.addToCart.findMany({
        where:{
            userId: userId
        },
        include:{
            user:true,
            service:true,
        }
    });
    return result;
}

export const GetAllServices = async (filters: { searchTerm?: string,minPrice?:string,maxPrice?:string },
    options: IPaginationOptions) => {
    const serviceSearchAbleFields = ['title', "status", "category","description",'serviceLocation'];

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm,minPrice,maxPrice, ...filterData } = filters;
    console.log(options)
    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: serviceSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }
    if (minPrice !== undefined) {
        andConditons.push({
            price: {
                gte: +minPrice,
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditons.push({
            price: {
                lte: +maxPrice,
            },
        });
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

    const whereConditons: Prisma.ServiceWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.service.findMany({
        where: { ...whereConditons },
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

export const GetOneService = async (id: number) => {
    const isUserExist = await prisma.service.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Service does not exist');
    }

    return isUserExist
}

export const UpdateService = async (id: number, payload: Partial<Service>) => {
    const isUserExist = await prisma.service.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Service does not exist');
    }

    const result = await prisma.service.update({
        where: {
            id
        },
        data: payload,
    })
    return result
}
export const DeleteService = async (id: number) => {
    const isUserExist = await prisma.service.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Service does not exist');
    }

    const result = await prisma.service.delete({
        where: {
            id
        },
    })
    return result
}


export const GetAllAvailableServices = async (filters: { searchTerm?: string,minPrice?:string,maxPrice?:string },
    options: IPaginationOptions) => {
    const serviceSearchAbleFields = ['title', "status", "category",'description','serviceLocation','minPrice','maxPrice'];

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm,minPrice,maxPrice, ...filterData } = filters;
    console.log(options)
    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: serviceSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }
    if (minPrice !== undefined) {
        andConditons.push({
            price: {
                gte: +minPrice,
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditons.push({
            price: {
                lte: +maxPrice,
            },
        });
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

    const whereConditons: Prisma.ServiceWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.service.findMany({
        where: { ...whereConditons, status: "available" },
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
export const GetAllUpComingServices = async (filters: { searchTerm?: string,minPrice?:string,maxPrice?:string  },
    options: IPaginationOptions) => {
    const serviceSearchAbleFields = ['title', "status", "category",'description','serviceLocation'];

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm,minPrice,maxPrice, ...filterData } = filters;
    console.log(options)
    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: serviceSearchAbleFields.map((field) => ({
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
    if (minPrice !== undefined) {
        andConditons.push({
            price: {
                gte: +minPrice,
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditons.push({
            price: {
                lte: +maxPrice,
            },
        });
    }
    /**
     * person = { name: 'fahim' }
     * name = person[name]
     * 
     */

    const whereConditons: Prisma.ServiceWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.service.findMany({
        where: { ...whereConditons, status: "up-coming" },
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
export const ServiceService = {
    CreateService,
    GetAllServices,
    GetOneService,
    UpdateService,
    DeleteService,
    GetAllAvailableServices,
    GetAllUpComingServices,
    CreateAddToCart,
    GetAllAddToCart
}