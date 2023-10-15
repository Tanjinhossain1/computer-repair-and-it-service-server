 
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { BlogPost, Faqs } from "@prisma/client";

const CreateBlogPost = async (data: BlogPost) => {
    const result = await prisma.blogPost.create({
        data,
    });
    return result;
}

const CreateFaqs = async (data: Faqs) => {
    const result = await prisma.faqs.create({
        data,
    });
    return result;
}


export const GetAllBlogPost = async (
    options: IPaginationOptions) => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.blogPost.findMany({
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            },
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
 
export const GetAllFaqs = async () => {
    const result = await prisma.faqs.findMany();
 
    return result
}
export const GetOneBlogPost = async (id: number) => {
    const isUserExist = await prisma.blogPost.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog does not exist');
    }
 
    return isUserExist
}

export const DeleteBlogPost = async (id: number) => {
    const isUserExist = await prisma.blogPost.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog does not exist');
    }

    const result = await prisma.blogPost.delete({
        where: {
            id
        }, 
    })
    return result
}
export const DeleteFaqs = async (id: number) => {
    const isUserExist = await prisma.faqs.findUnique({
        where: {
            id
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faqs does not exist');
    }

    const result = await prisma.faqs.delete({
        where: {
            id
        }, 
    })
    return result
}

export const BlogPostService = {
    CreateBlogPost,
    GetAllBlogPost, 
    GetOneBlogPost,
    DeleteBlogPost,
    CreateFaqs,
    GetAllFaqs,
    DeleteFaqs
}