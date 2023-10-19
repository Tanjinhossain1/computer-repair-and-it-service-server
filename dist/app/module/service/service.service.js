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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = exports.GetAllUpComingServices = exports.GetAllAvailableServices = exports.DeleteService = exports.UpdateService = exports.GetOneService = exports.GetAllServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const CreateService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data,
    });
    return result;
});
const CreateAddToCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.addToCart.findFirst({
        where: {
            userId: data.userId,
            serviceId: data.serviceId
        }
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This Service Already Added In cart');
    }
    const result = yield prisma_1.default.addToCart.create({
        data,
    });
    return result;
});
const GetAllAddToCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.addToCart.findMany({
        where: {
            userId: userId
        },
        include: {
            user: true,
            service: true,
        }
    });
    return result;
});
const GetAllServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceSearchAbleFields = ['title', "status", "category", "description", 'serviceLocation'];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    console.log(options);
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: serviceSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
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
                    equals: filterData[key]
                }
            }))
        });
    }
    /**
     * person = { name: 'fahim' }
     * name = person[name]
     *
     */
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.service.findMany({
        where: Object.assign({}, whereConditons),
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
exports.GetAllServices = GetAllServices;
const GetOneService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.service.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service does not exist');
    }
    return isUserExist;
});
exports.GetOneService = GetOneService;
const UpdateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.service.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service does not exist');
    }
    const result = yield prisma_1.default.service.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
exports.UpdateService = UpdateService;
const DeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.service.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service does not exist');
    }
    const result = yield prisma_1.default.service.delete({
        where: {
            id
        },
    });
    return result;
});
exports.DeleteService = DeleteService;
const GetAllAvailableServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceSearchAbleFields = ['title', "status", "category", 'description', 'serviceLocation', 'minPrice', 'maxPrice'];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    console.log(options);
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: serviceSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
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
                    equals: filterData[key]
                }
            }))
        });
    }
    /**
     * person = { name: 'fahim' }
     * name = person[name]
     *
     */
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.service.findMany({
        where: Object.assign(Object.assign({}, whereConditons), { status: "available" }),
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
exports.GetAllAvailableServices = GetAllAvailableServices;
const GetAllUpComingServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceSearchAbleFields = ['title', "status", "category", 'description', 'serviceLocation'];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    console.log(options);
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: serviceSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
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
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.service.findMany({
        where: Object.assign(Object.assign({}, whereConditons), { status: "up-coming" }),
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
exports.GetAllUpComingServices = GetAllUpComingServices;
exports.ServiceService = {
    CreateService,
    GetAllServices: exports.GetAllServices,
    GetOneService: exports.GetOneService,
    UpdateService: exports.UpdateService,
    DeleteService: exports.DeleteService,
    GetAllAvailableServices: exports.GetAllAvailableServices,
    GetAllUpComingServices: exports.GetAllUpComingServices,
    CreateAddToCart,
    GetAllAddToCart
};
