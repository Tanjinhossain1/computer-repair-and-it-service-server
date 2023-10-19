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
exports.BookingService = exports.DeleteBooking = exports.IsServiceAlreadyBookThisUser = exports.UpdateBooking = exports.GetUserOwnBooking = exports.GetAllBooking = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const CreateBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.create({
        data,
    });
    return result;
});
const CreateReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.create({
        data,
    });
    return result;
});
const GetAllReviews = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            serviceId
        },
        include: {
            user: true
        }
    });
    return result;
});
const GetAllBooking = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.booking.findMany({
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
exports.GetAllBooking = GetAllBooking;
const GetUserOwnBooking = (userId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.booking.findMany({
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
exports.GetUserOwnBooking = GetUserOwnBooking;
const UpdateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.booking.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking does not exist');
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
exports.UpdateBooking = UpdateBooking;
const IsServiceAlreadyBookThisUser = (userId, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findFirst({
        where: {
            userId,
            serviceId,
        },
    });
    return result;
    return result;
});
exports.IsServiceAlreadyBookThisUser = IsServiceAlreadyBookThisUser;
const DeleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.booking.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking does not exist');
    }
    const result = yield prisma_1.default.booking.delete({
        where: {
            id
        },
    });
    return result;
});
exports.DeleteBooking = DeleteBooking;
exports.BookingService = {
    CreateBooking,
    GetAllBooking: exports.GetAllBooking,
    GetUserOwnBooking: exports.GetUserOwnBooking,
    UpdateBooking: exports.UpdateBooking,
    DeleteBooking: exports.DeleteBooking,
    IsServiceAlreadyBookThisUser: exports.IsServiceAlreadyBookThisUser,
    CreateReview,
    GetAllReviews
};
