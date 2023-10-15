"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostService = exports.DeleteFaqs = exports.DeleteBlogPost = exports.GetOneBlogPost = exports.GetAllFaqs = exports.GetAllBlogPost = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const CreateBlogPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogPost.create({
        data,
    });
    return result;
});
const CreateFaqs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faqs.create({
        data,
    });
    return result;
});
const GetAllBlogPost = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.blogPost.findMany({
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
    const total = result.length;
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
});
exports.GetAllBlogPost = GetAllBlogPost;
const GetAllFaqs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faqs.findMany();
    return result;
});
exports.GetAllFaqs = GetAllFaqs;
const GetOneBlogPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.blogPost.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Blog does not exist');
    }
    return isUserExist;
});
exports.GetOneBlogPost = GetOneBlogPost;
const DeleteBlogPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.blogPost.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Blog does not exist');
    }
    const result = yield prisma_1.default.blogPost.delete({
        where: {
            id
        },
    });
    return result;
});
exports.DeleteBlogPost = DeleteBlogPost;
const DeleteFaqs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.faqs.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Faqs does not exist');
    }
    const result = yield prisma_1.default.faqs.delete({
        where: {
            id
        },
    });
    return result;
});
exports.DeleteFaqs = DeleteFaqs;
exports.BlogPostService = {
    CreateBlogPost,
    GetAllBlogPost: exports.GetAllBlogPost,
    GetOneBlogPost: exports.GetOneBlogPost,
    DeleteBlogPost: exports.DeleteBlogPost,
    CreateFaqs,
    GetAllFaqs: exports.GetAllFaqs,
    DeleteFaqs: exports.DeleteFaqs
};
