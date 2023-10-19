import { Booking, Review } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const CreateBooking = async (data: Booking) => {
    const result = await prisma.booking.create({
        data,
    });
    return result;
}

const CreateReview = async (data: Review) => {
    const result = await prisma.review.create({
        data,
    });
    return result;
}


const GetAllReviews = async (serviceId:number) => {
    const result = await prisma.review.findMany({
        where:{
            serviceId
        },
        include:{
            user: true
        }
    });
    return result;
}


export const GetAllBooking = async (
    options: IPaginationOptions) => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.booking.findMany({
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            },
        include: {
            service: true,
            user: true,
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

export const GetUserOwnBooking = async (userId: number,
    options: IPaginationOptions) => {
        const isUserExist = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    
        if (!isUserExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
        }
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.booking.findMany({
        where: { userId: userId },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            },
        include: {
            service: true,
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

export const UpdateBooking = async (id: number, payload: Partial<Booking>) => {
    const isUserExist = await prisma.booking.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not exist');
    }

    const result = await prisma.booking.update({
        where: {
            id
        },
        data: payload,
    })
    return result
}
export const IsServiceAlreadyBookThisUser = async (userId: number, serviceId: number) => {
    const result = await prisma.booking.findFirst({
        where: { 
              userId,
              serviceId, 
          },
      });
    
      return result;


    return result
}
export const DeleteBooking = async (id: number) => {
    const isUserExist = await prisma.booking.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not exist');
    }

    const result = await prisma.booking.delete({
        where: {
            id
        },
    })
    return result
}

export const BookingService = {
    CreateBooking,
    GetAllBooking,
    GetUserOwnBooking,
    UpdateBooking,
    DeleteBooking,
    IsServiceAlreadyBookThisUser,
    CreateReview,
    GetAllReviews
}